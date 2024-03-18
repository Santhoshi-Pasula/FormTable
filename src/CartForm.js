import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { Button, Form, Input, Table } from 'antd';
const CartForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        quantity: ''
    });

    const handleFormChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(formData);
        // Clear the form data after submission
        setFormData({
            title: '',
            price: '',
            quantity: ''
        });
    };

    return (
        <div>
        <Form onSubmit={handleSubmit}>
            <Form.Item label="Title">
                <Input name="title" value={formData.title} onChange={handleFormChange} />
            </Form.Item>
            <Form.Item label="Price">
                <Input name="price" value={formData.price} onChange={handleFormChange} />
            </Form.Item>
            <Form.Item label="Quantity">
                <Input name="quantity" value={formData.quantity} onChange={handleFormChange} />
            </Form.Item>
            <Button type="primary" htmlType="submit">Add Cart</Button>
        </Form>
        </div>
    );
};
export default CartForm