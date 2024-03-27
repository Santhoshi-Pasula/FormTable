// Table.js
import React from 'react';
import { Table,Icon } from 'antd';
import { useRecords } from './ContextData';

const TableForm = () => {
    const { records } = useRecords();


   

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
            title: 'Actions',
            key: 'action',
            render: () => (
                <span>
                    <Icon type="edit" ></Icon>
                    <Icon type="delete" ></Icon>
                </span>
            ),
        },
    ]
    return (

        <Table
            columns={columns}
            dataSource={records}
            pagination={{ pageSize: 6, size: 'small' }}
        />
    );
};

export default TableForm;
