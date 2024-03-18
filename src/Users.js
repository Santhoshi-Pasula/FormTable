import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Table, Form, message } from 'antd';

const Users = () => {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    setFormData(record);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      fetchData();
      message.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Make an API call to add the user
      const response = await axios.post(`https://jsonplaceholder.typicode.com/users`, formData);
      console.log('User added successfully:', response.data);
  
      // Clear the form after successful submission
      setFormData({
        name: '',
        email: '',
        username: ''
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Name:', name);
    console.log('Value:', value);
    const updatedFormData= ({ ...formData, [name]: value });
    console.log('Updated Form Data:', updatedFormData);
    setFormData(updatedFormData);
  };
  
  
  

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button  onClick={() => handleEdit(record)}>Edit</Button>
          <Button  onClick={() => handleDelete(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Name" >
          <Input name='name' value={formData.name} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Email" >
          <Input name='email' value={formData.email} onChange={handleChange}  />
        </Form.Item>
        <Form.Item label="Username" name="username">
          <Input name='username' value={formData.username} onChange={handleChange}  />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>

      <Table dataSource={data} columns={columns} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default Users;
