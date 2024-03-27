
import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { Table, Button, Modal, Input, Form } from 'antd';
import './App.scss'

const UserTable = () => {
  const { users, editUser, deleteUser } = useContext(UserContext);
  const [modalVisible, setmodalVisible] = useState(false)
  const { confirm } = Modal;

  const handleEdit = (user) => {
    Modal.confirm({
      title: 'Edit User',
      content: (
        <div className='signup_page'>
          <Form>
            <div className='userform'>
              <div >
                <Form.Item label="first name">

                  <Input placeholder="First Name" defaultValue={user.firstName} onChange={(e) => user.firstName = e.target.value} />
                </Form.Item>
              </div>
              <div>
                <Form.Item label="Last name">

                  <Input placeholder="Last Name" defaultValue={user.lastName} onChange={(e) => user.lastName = e.target.value} />
                </Form.Item>
              </div>
              <div>
                <Form.Item label="Email">

                  <Input placeholder="Email" defaultValue={user.email} onChange={(e) => user.email = e.target.value} />
                </Form.Item>
              </div>
              <div>
                <Form.Item label="Phone Number">

                  <Input placeholder="Phone Number" defaultValue={user.phoneNumber} onChange={(e) => user.phoneNumber = e.target.value} />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      ),
      onOk() {
        editUser(user);
      }
    });
  };


  const handleDelete = (index) => {
    deleteUser(index);
  };

  const columns = [
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
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, user, index) => (
        <div>
          <Button onClick={() => handleDelete(index)}>Delete</Button>
          <Button onClick={() => handleEdit(user)}>Edit</Button>
        </div>
      ),
    },
  ];

  return (
    <div className='FetchData'>
      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 6, size: 'small' }}

      />


    </div>

  );
};

export default UserTable;
