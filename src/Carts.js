import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table,Button, message } from 'antd';
import './App.scss';

const Carts = () => {
    const [data, setData] = useState([]);
    const [cart,setCart]=useState(null);

    useEffect(() => {
        axios.get('https://dummyjson.com/carts/1')
            .then(res => {
                if(res.data){
                    setCart(res.data);
                }
            })
            
    }, []);

           //get all carts  
           useEffect(() => {
            axios.get('https://dummyjson.com/carts')
                .then(res => {    
                if (Array.isArray(res.data.carts)) {
                    setData(res.data.carts);
                } 
                
            })
            
    }, []);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = () => {
        axios.get('https://dummyjson.com/carts/1')
            .then(res => {
                if (res.data) {
                    setCart(res.data);
                }
            })
            .catch(error => console.error('Error fetching cart:', error));
    };

    const handleEditCart = () => {
        
        message.success('Cart edited successfully');
       
        fetchCart();
    };

    const handleDeleteCart = () => {
       message.success('Cart deleted successfully');
       setCart(null);
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
        },{
            title: 'Actions',
            key: 'actions',
            render: () => (
                <div>
                    {/* <Button type="primary" onClick={handleEditCart}>Edit</Button> */}
                    <Button type="danger" onClick={handleDeleteCart}>Delete</Button>
                </div>
            )
        }
    ];

    return (
        <div className='FetchData'>
            <h3>Get all carts</h3>
            <Table
                columns={columns}   
                dataSource={data}
                pagination={{ pageSize: 6, size: 'small' }} 
            />

            <h3>get a single cart</h3>
            {cart && (
                <Table
                columns={columns}   
                dataSource={[cart]}
                />
                
            )}
        </div>
    );
};

export default Carts;
