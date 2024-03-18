import React, { useState } from 'react';
import { Input, Checkbox, DatePicker, Radio, Select, Button, Form, Table, Icon, Switch } from 'antd';
import './FormTable.scss'
import moment from 'moment'

const { Option } = Select;

const FormTable = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState([]);
    const [inputData, setInputData] = useState({
        title: '',
        location: '',
        hostname: '',
        events: '',
        startDate: null,
        endDate: null,
        eventType: '',
        amenties: [],
        status:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const handleSelectChange = (value, name) => {
        setInputData({ ...inputData, [name]: value });
    };

    const handleDatePickerChange = (date, dateString, name) => {
        setInputData({ ...inputData, [name]: dateString });
    };
    const handleSwitchChange = (checked) => {
        const status = checked ? 'online' : 'offline';
        setInputData({ ...inputData, status });
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingIndex !== null) {
            
            formData[editingIndex] = inputData;
        } else {
           
            setFormData([...formData, inputData]);
        }
        setInputData({
            title: '',
            location: '',
            hostname: '',
            bloodgroup: '',
            startDate: null,
            endDate: null,
            eventType: '',
            status:'',
            amenties: [],
            
        });

        setEditingIndex(null); 
    };

    const handleEdit = (record, index) => {
        setInputData(record);
        setEditingIndex(index);
    };

    const handleDelete = (record) => {
        const updatedFormData = formData.filter(item => item !== record);
        setFormData(updatedFormData);
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Host Name',
            dataIndex: 'hostname',
            key: 'hostname',
        },
        {
            title: 'Amenties',
            dataIndex: 'amenties',
            key: 'amenties',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Event Type',
            dataIndex: 'eventType',
            key: 'eventType',
        },
        {
            title: 'Event Category',
            dataIndex: 'events',
            key: 'events',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },

        {
            title: 'Actions',
            key: 'actions',
            render: (_, record, index) => (
                <span>
                    <Icon type="edit" onClick={() => handleEdit(record, index)}></Icon>
                    <Icon type="delete" onClick={() => handleDelete(record)}></Icon>
                </span>
            ),
        },
    ];

    return (
        <div className='Formtable'>
            <h3>Form Table</h3>
            <Form onSubmit={handleSubmit}>
                <div className='event_info'>
                    <div>
                        <label>Event Title</label>
                        <Input type='text' name='title' value={inputData.title} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Location</label>
                        <Input type='text' name='location' value={inputData.location} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Host Name</label>
                        <Input type='text' name='hostname' value={inputData.hostname} onChange={handleChange} />
                    </div>
                    <div>
                        <label>event category</label>
                        <Select placeholder="select category" value={inputData.events} onChange={(value) => handleSelectChange(value, 'events')}>
                            <Option value="music">music</Option>
                            <Option value="sports">sports</Option>
                            <Option value="food">food</Option>
                            <Option value="fashion">fashion</Option>
                        </Select>
                    </div>
                    <div>
                        <label>Start Date</label>
                        <DatePicker value={inputData.startDate ? moment(inputData.startDate, 'YYYY-MM-DD') : null} onChange={(date, dateString) => handleDatePickerChange(date, dateString, 'startDate')} />
                    </div>
                    <div>
                        <label>End Date</label>
                        <DatePicker value={inputData.endDate ? moment(inputData.endDate, 'YYYY-MM-DD') : null} onChange={(date, dateString) => handleDatePickerChange(date, dateString, 'endDate')} />
                    </div>
                    <div>
                        <label>Event Type</label>
                        <div>
                            <Radio.Group
                                options={['public', 'private']}
                                value={inputData.eventType} onChange={(e) => setInputData({ ...inputData, eventType: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Amenties</label>
                        <div>
                            <Checkbox.Group
                                options={['Catering', 'Parking']}
                                value={inputData.amenties} onChange={(checkedValues) => setInputData({ ...inputData, amenties: checkedValues })}
                            />
                        </div>
                    </div>
                    <div>
                        <label>registration online/offline</label>
                        <Switch checkedChildren="online" unCheckedChildren="offline"
                             checked={inputData.status === 'online'}
                             onChange={handleSwitchChange}
                        />
                    </div>
                </div>
                {/* <div className='submitbtn'>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </div> */}
                <div className='submitbtn'>
                    {editingIndex !== null ? (
                        <Button type='primary' htmlType='submit'>Update</Button>
                    ) : (
                        <Button type='primary' htmlType='submit'>Submit</Button>
                    )}
                </div>
            </Form>
            <div className='table'>
                <Table dataSource={formData} columns={columns} />
            </div>
        </div>
    );
}

export default FormTable;
