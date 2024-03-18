import { Button, Form, Input, Table } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import './Cart.scss';

const Cart = () => {
    const [data, setData] = useState([]);
    const [inputData, setInputData] = useState({
        id: '',
        title: '',
        price: '',
        quantity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     // Fetch data from the API
        //     const response = await axios.get('https://dummyjson.com/docs/carts');
        //     console.log(response.data); // Log the response data to inspect its structure
        //     // Check if response data is an array
        //     if (Array.isArray(response.data)) {
        //         // Update the data state with the fetched data
        //         setData(response.data);
        //     } else {
        //         console.error('API response is not an array:', response.data);
        //     }
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // }
    };
    
    

    // const columns = [
    //     {
    //         title: 'Id',
    //         dataIndex: 'id',
    //         key: 'id'
    //     },
    //     {
    //         title: 'Title',
    //         dataIndex: 'title',
    //         key: 'title'
    //     },
    //     {
    //         title: 'Price',
    //         dataIndex: 'price',
    //         key: 'price'
    //     },
    //     {
    //         title: 'Quantity',
    //         dataIndex: 'quantity',
    //         key: 'quantity'
    //     }
    // ];

    return (
        <div className='cartapp'>
            <Form onSubmit={handleSubmit}>
                <div>
                    <h3>Cart example with API integration</h3>
                    <div className='cart_details'>
                        <div>
                            <label>id</label>
                            <Input name='id' value={inputData.id} onChange={handleChange} />
                        </div>
                        <div>
                            <label>title</label>
                            <Input name='title' value={inputData.title} onChange={handleChange} />
                        </div>
                        <div>
                            <label>price</label>
                            <Input name='price' value={inputData.price} onChange={handleChange} />
                        </div>
                        <div>
                            <label>quantity</label>
                            <Input name='quantity' value={inputData.quantity} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='submitbtn'>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </div>
                </div>
            </Form>
            {/* <div className='table'>
                <Table dataSource={data} columns={columns} />
            </div> */}
        </div>
    );
};

export default Cart;
