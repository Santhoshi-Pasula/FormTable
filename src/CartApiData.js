import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Input, Button, message } from 'antd';
import './App.scss';

const CartApiData = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        quantity: ''
    });

    useEffect(() => {
        axios.get('https://dummyjson.com/carts')
            .then(res => {
                if (Array.isArray(res.data.carts)) {
                    setData(res.data.carts);
                }
            })
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };



    const getCart = (cartId) => {
        axios.get(`https://dummyjson.com/carts/${cartId}`)
            .then(res => {
                setCart(res.data);

            })

    };
    const deleteCart = (cartId) => {

        axios.delete(`https://dummyjson.com/carts/${cartId}`)
            .then(res => {
                setData(data.filter(cart => cart.id !== cartId));
                setCart(null);

                message.success('User deleted successfully');
            })

    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Title',
            dataIndex: 'products',
            key: 'products',
            render: products => (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.title}</li>
                    ))}
                </ul>
            )
        },
        {
            title: ' Price',
            dataIndex: 'products',
            key: 'totalPrice',
            render: products => (
                products.reduce((total, product) => total + product.total, 0)
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button onClick={() => getCart(record.id)}>Get cart</Button>
                    <Button onClick={() => deleteCart(record.id)}>Delete cart</Button>
                </>
            ),
        },
    ];

    return (
        <div className='FetchData'>
            <Form>
                <Form.Item>
                    <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <Input name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" >Add Cart</Button>
                </Form.Item>
            </Form>

            <h3>All Carts</h3>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 6, size: 'small' }}
            />
        </div>
    );
};

export default CartApiData;
