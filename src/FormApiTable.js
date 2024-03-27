import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, message, Form, Input, DatePicker } from 'antd';
import moment from 'moment';
import './App.scss';

const FormApiTable = () => {
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editData, setEditData] = useState(false)
    const [formData, setFormData] = useState({
        //id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        DOB: '',
        username: '',
        age: ''
    });

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/users/v1.0/getUsers');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getUsers();
    }, []);

    const getUser = (_id) => {
        axios.get(`http://localhost:8081/api/users/v1.0/getUsersById/${_id}`)
            .then(res => {
                setSelectedUser(res.data.data);
                setFormData(res.data.data);
                setEditData(true);
            })
            .catch(err => console.log(err));
    };

    const deleteUser = (_id) => {

        axios.delete(`http://localhost:8081/api/users/v1.0/deleteUser/${_id}`)
            .then(res => {
                setData(data.filter(user => user._id !== _id));
                setSelectedUser(null);
                message.success('User deleted successfully');
            })

    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDatePickerChange = (date, dateString) => {
        setFormData({
            ...formData,
            DOB: dateString ? dateString : null
        });
    };


    const addUser = () => {
        axios.post('http://localhost:8081/api/users/v1.0/createUser', formData)
            .then(res => {
                const newUser = res.data.data;
                setData(prevData => [...prevData, newUser]);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    username: '',
                    age: '',
                    DOB:'',
                    phone:''
                });
                message.success('User added successfully');
            })
            .catch(error => {
                console.error('Error adding user:', error);
                message.error('Failed to add user. Please try again.');
            });
    };

    const updateUser = async () => {
        try {
            const response = await axios.put(`http://localhost:8081/api/users/v1.0/updateUser/${selectedUser._id}`, formData);
            const updatedUser = response.data.response;
            setData(prevData => prevData.map(user => user._id === selectedUser._id ? updatedUser : user));
            message.success('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            message.error('Failed to update user. Please try again.');
        }
    };

    const handleEdit = (_id) => {
        setEditData(true);
        setFormData(selectedUser)
        getUser(_id);

    };

    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: '_id',
        //     key: '_id'
        // },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'DOB',
            dataIndex: 'DOB',
            key: 'DOB'
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div>
                    <Button onClick={() => getUser(record?._id)}>Get User</Button>
                    <Button onClick={() => deleteUser(record?._id)}>Delete User</Button>
                    <Button onClick={() => handleEdit(record?._id)}>Edit</Button>
                </div>
            ),
        },
    ];

    return (
        <div className='FetchData'>
            <h3>Fetch data from API in React</h3>

            <Form >
                <div className='formpage'>
                    {/* <div>
                        <Form.Item label="Id">

                            <Input name="_id" placeholder="id" value={formData?._id} onChange={handleChange} />
                        </Form.Item>
                    </div> */}
                    <div>
                        <Form.Item label="First Name">

                            <Input name="firstName" placeholder="Name" value={formData?.firstName} onChange={handleChange} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Last Name">

                            <Input name="lastName" placeholder="last name" value={formData?.lastName} onChange={handleChange} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Email">

                            <Input name="email" placeholder="Email" value={formData?.email} onChange={handleChange} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Username">

                            <Input name="username" placeholder="Username" value={formData?.username} onChange={handleChange} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Age">

                            <Input name="age" placeholder="age" value={formData?.age} onChange={handleChange} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="DoB">

                            <DatePicker name="DOB" placeholder="DOB" value={formData?.DOB ? moment(formData.DOB, 'YYYY-MM-DD') : null} onChange={handleDatePickerChange} />


                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Phone number">

                            <Input name="phone" placeholder="phone" value={formData?.phone} onChange={handleChange} />
                        </Form.Item>
                    </div>

                </div>
                <Form.Item>

                    <div className='addbtn'>
                        <Button type="primary" onClick={editData ? updateUser : addUser} >
                            {editData ? 'Update user' : 'Add user'}
                        </Button>
                    </div>

                </Form.Item>

            </Form>

            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 6, size: 'small' }}
                rowKey="_id"
            />

            
        </div>
    );
};

export default FormApiTable;
