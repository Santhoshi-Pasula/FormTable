// Form.js
import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { useRecords } from './ContextData';

const FormPage = () => {
    const { addRecord, editRecord } = useRecords();

    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        username: '',
    });
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        if (editData) {
            setInputData(editData);
        } else {
            setInputData({
                name: '',
                email: '',
                username: '',
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const addUser = () => {
        if (inputData.name && inputData.email && inputData.username) {
            addRecord(inputData);
            setInputData({
                name: '',
                email: '',
                username: '',
            });
        }
    };

    const updateUser = () => {
        if (inputData.name && inputData.email && inputData.username) {
            editRecord(editData.id, inputData);
            setEditData(null);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className='user_content'>
                <div>
                    <label>Name</label>
                    <Input name='name' value={inputData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <Input name='email' value={inputData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Username</label>
                    <Input name='username' value={inputData.username} onChange={handleChange} />
                </div>
            </div>
            <div className='addbtn'>
                <Button type="primary" onClick={editData ? updateUser : addUser} >
                    {editData ? 'Update user' : 'Add user'}
                </Button>
            </div>
        </form>
    );
};

export default FormPage;
