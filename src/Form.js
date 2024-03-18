import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Icon, Input, Table,message } from 'antd';
import './App.scss';

const Form = () => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const [editData, setEditData] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
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

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users/1')
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, []);

   
    const handleEdit = (record, index) => {
        setFormData(record); 
    };

    const handleDelete = (id) => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
        message.success('Record deleted successfully!');
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
            title: 'Action',
            key: 'action',
            render: ( _,record,index) => (
                <span>
                    <Icon type="edit" onClick={() => handleEdit(record,index)}/>
                    <Icon type="delete" onClick={() => handleDelete(record.id)}/>
                </span>
            ),
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const newData = { ...formData, id: data.length + 1 }; 
    //     setData([...data, newData]); 
    //     setFormData({ id: '', name: '', email: '', username: '', website: '' }); 
    // };
    const handleSubmit = (e) => {
    e.preventDefault();
    if (editData !== null) {
       
        const updatedData = [...data];
        updatedData[editData] = formData;
        setData(updatedData);
        message.success('Record updated successfully!');
    } else {
       
        const newData = { ...formData, id: data.length + 1 };
        setData([...data, newData]);
        message.success('Record added successfully!');
    }
    
    setFormData({ id: '', name: '', email: '', username: '', website: '' });
    setEditData(null);
};


    return (
        <div className='FetchData'>
            <h3>Fetch data from API in React with Axios</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='user_content'>
                        <div>
                            <label>ID</label>
                            <Input name='id' value={formData.id} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Name</label>
                            <Input name='name' value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Email</label>
                            <Input name='email' value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Username</label>
                            <Input name='username' value={formData.username} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Website</label>
                            <Input name='website' value={formData.website} onChange={handleChange} />
                        </div>
                    </div>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </form>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 6, size: 'small' }}
            />
            <div>
                <h3>get a single user</h3>
                {user && (
                <Table
                columns={columns}
                dataSource={[user]}
                pagination={{ pageSize: 6, size: 'small' }}
            />
                )}
            </div>
        </div>
    );
};

export default Form;
