import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Table, message, Form } from 'antd';
import './App.scss';



const FormApiData = () => {
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [editData, setEditData] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        website: ''
    });


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

   const getUser = (userId) => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(res => {
                setSelectedUser(res.data);
                setFormData(res.data); 
                setEditData(true); 
            })
            .catch(err => console.log(err));
    };

    const deleteUser = (userId) => {

        axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(res => {
                setData(data.filter(user => user.id !== userId));
                setSelectedUser(null);
                message.success('User deleted successfully');
            })

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    
    
    const addUser = () => {
        axios.post('https://jsonplaceholder.typicode.com/users', formData)
            .then(res => {
                const newUser = res.data;
                
                setData(prevData => [...prevData, newUser]);
                setFormData({
                    name: '',
                    email: '',
                    username: '',
                    website: ''
                });
                message.success('User added successfully');
    
                
                axios.get('https://jsonplaceholder.typicode.com/users')
                    .then(res => setData(res.data))
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.error('Error adding user:', error);
                message.error('Failed to add user. Please try again.');
            });
    };
    
    
    
    

    

    const updateUser = () => {
        axios.put(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, formData)
            .then(res => {
                
                const updatedUser = res.data;
                const updatedData = data.map(user => {
                    if (user.id === selectedUser.id) {
                        return updatedUser;
                    }
                    return user;
                });
                setData(updatedData);
                message.success('User updated successfully');
    
               
                setEditData(false);
                setSelectedUser(null);
                setFormData({
                    name: '',
                    email: '',
                    username: '',
                    website: ''
                });
            })
            .catch(error => {
                console.error('Error updating user:', error);
                message.error('Failed to update user. Please try again.');
            });
    };
    



   


    const handleEdit = (userId) => {
        //setEditData(true);
        getUser(userId);
        // const selectedUserData = data.find(user => user.id === userId);
        // setFormData(selectedUserData);
    };
    



    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button onClick={() => getUser(record.id)}>Get User</Button>
                    <Button onClick={() => deleteUser(record.id)}>Delete User</Button>
                    <Button onClick={() => handleEdit(record.id)}>Edit</Button>
                </>
            ),
        },
    ];

    return (
        <div className='FetchData'>
            <h3>Fetch data from API in React </h3>

            <Form >
                <div className='formpage'>
                    <div>
                        <Form.Item label="Name">

                            <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Email">

                            <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Username">

                            <Input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Website">

                            <Input name="website" placeholder="Website" value={formData.website} onChange={handleChange} />
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <div className='addbtn'>
                            <Button type="primary" onClick={editData ? updateUser : addUser} >
                                {editData ? 'Update user' : 'Add user'}
                            </Button>
                        </div>
                    </Form.Item>
                </div>
            </Form>


            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 6, size: 'small' }}
                rowKey="id"
            />



        </div>
    );
};

export default FormApiData;
