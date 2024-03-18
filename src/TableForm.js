import './TableForm.scss';
import "antd/dist/antd.css";
import { Button, Form, Input, Table, Checkbox, Radio, DatePicker, Switch, Divider, Icon, Modal } from 'antd';
import React, { useState } from 'react';
import moment from "moment";

const TableForm = ({ form }) => {
  const [inputData, setInputData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);



  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const data = {
          title: values.title,
          location: values.location,
          hostname: values.hostName,
          amenties: values.amenties,
          startdate: moment(values.startDate).format("MM/DD/YYYY"),
          enddate: moment(values.endDate).format("MM/DD/YYYY"),
          eventtype: values.eventType,
          primary: values.primary,
        };
        setInputData([...inputData, data]);
        form.resetFields();
      }
    });
  };

  const handleSaveEdit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const newData = inputData.map(item => {
          if (item.key === editRecord.key) {
            return {
              ...item,
              title: values.title,
              location: values.location,
              hostname: values.hostName,
              amenties: values.amenties,
              startdate: moment(values.startDate).format("MM/DD/YYYY"),
              enddate: moment(values.endDate).format("MM/DD/YYYY"),
              eventtype: values.eventType,
              primary: values.primary,
            };
          }
          return item;
        });
        setInputData(newData);
        setEditModalVisible(false);
      }
    });
  };

 

  const handleDelete = (record) => {
   
    setInputData(inputData.filter(item => item !== record));
  };

  const handleEdit = (record) => {
    setEditRecord(record);
    setEditModalVisible(true);
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
      title: 'host name',
      dataIndex: 'hostname',
      key: 'hostname',
    },
    {
      title: 'Amenties',
      dataIndex: 'amenties',
      key: 'amenties',
    },
    {
      title: 'start date',
      dataIndex: 'startdate',
      key: 'startdate',
    },
    {
      title: 'End date',
      dataIndex: 'enddate',
      key: 'enddate',
    },
    {
      title: 'Event type',
      dataIndex: 'eventtype',
      key: 'eventtype',

    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button 
          onClick={() =>{

           handleEdit(record)
          
          }}
          >Edit</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
    },
   

  ];

  const { getFieldDecorator } = form;

  return (
    <div>
      <div className="App">

        <Form onSubmit={handleSubmit}>
          <div className='formdetails'>
            <div>
              <label>Title</label>
              <Form.Item>
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please input the title!' }],
                })(<Input />)}
              </Form.Item>
            </div>
            <div>
              <label>Location</label>
              <Form.Item>
                {getFieldDecorator('location', {
                  rules: [{ required: true, message: 'Please input the location!' }],
                })(<Input />)}
              </Form.Item>
            </div>
            <div>
              <label>host name</label>
              <Form.Item>
                {getFieldDecorator('hostName', {
                  rules: [{ required: true, message: 'Please input the hostname!' }],
                })(<Input />)}
              </Form.Item>
            </div>
            <div>
              <Form.Item label="Amenties">
                {getFieldDecorator('amenties', {
                  rules: [
                    {
                      required: true,
                      message: "amenties is required",
                    },
                  ],
                })(
                  <Checkbox.Group
                    options={[
                      "Catering",
                      "Parking",

                    ]}
                  />
                )}
              </Form.Item>
            </div>
            <div>
              <Form.Item label="Event type">
                {getFieldDecorator('eventType', {
                  rules: [
                    {
                      required: true,
                      message: "event type is required",
                    },
                  ],
                })(
                  <Radio.Group
                    options={[
                      "public",
                      "private",

                    ]}
                  />
                )}
              </Form.Item>
            </div>
            <div >
              <Form.Item label="Start Date">
                {getFieldDecorator(`startDate`, {
                  rules: [
                    {
                      required: true,
                      message: "Effective Date is required",
                    },
                  ],
                })(
                  <DatePicker
                   
                    format={"MM/DD/YYYY"}
                    
                    placeholder={`start Date`}
                  />
                )}{" "}
              </Form.Item>
            </div>
            <div>
              <Form.Item label="End Date">
                {getFieldDecorator(`endDate`, {
                  rules: [
                    {
                      required: true,
                      message: "End Date is required",
                    },
                  ],
                })(
                  <DatePicker
                    format={"MM/DD/YYYY"}
                   
                   
                    placeholder={`End Date`}
                  />
                )}{" "}
              </Form.Item>
            </div>
            <div>
              <Form.Item label="registration">
                {getFieldDecorator(`primary`, {
                  rules: [
                    {
                      required: true,
                      message: "Subscriber is required",
                    },
                  ],
                })(
                  <Switch
                    checked={form.getFieldValue(
                      `primary`
                    )}
                  />
                )}{" "}
                <span>Online</span>
              </Form.Item>
            </div>


          </div>
          <div className='submitbtn'>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>

        <div className='table'>
          <Table dataSource={inputData} columns={columns} />
        </div>
        <Modal
          title="Edit Record"
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          onOk={handleSaveEdit}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                initialValue: editRecord ? editRecord.title : '',
                rules: [{ required: true, message: 'Please input the title!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Location">
              {getFieldDecorator('location', {
                initialValue: editRecord ? editRecord.location : '',
                rules: [{ required: true, message: 'Please input the location!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Host Name">
              {getFieldDecorator('hostName', {
                initialValue: editRecord ? editRecord.hostname : '',
                rules: [{ required: true, message: 'Please input the hostname!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Amenties">
              {getFieldDecorator('amenties', {
                initialValue: editRecord ? editRecord.amenties : [],
                rules: [{ required: true, message: 'Please select amenties!' }],
              })(
                <Checkbox.Group
                  options={[
                    "Catering",
                    "Parking",
                  ]}
                />
              )}
            </Form.Item>
            <Form.Item label="Event Type">
              {getFieldDecorator('eventType', {
                initialValue: editRecord ? editRecord.eventtype : '',
                rules: [{ required: true, message: 'Please select event type!' }],
              })(
                <Radio.Group
                  options={[
                    "public",
                    "private",
                  ]}
                />
              )}
            </Form.Item>
            <Form.Item label="Start Date">
              {getFieldDecorator('startDate', {
                initialValue: editRecord ? moment(editRecord.startdate, "MM/DD/YYYY") : null,
                rules: [{ required: true, message: 'Please select start date!' }],
              })(
                <DatePicker format="MM/DD/YYYY" />
              )}
            </Form.Item>
            <Form.Item label="End Date">
              {getFieldDecorator('endDate', {
                initialValue: editRecord ? moment(editRecord.enddate, "MM/DD/YYYY") : null,
                rules: [{ required: true, message: 'Please select end date!' }],
              })(
                <DatePicker format="MM/DD/YYYY" />
              )}
            </Form.Item>
            <Form.Item label="Registration">
              {getFieldDecorator('primary', {
                valuePropName: 'checked',
                initialValue: editRecord ? editRecord.primary : false,
              })(
                <Switch />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>

    </div>
  );
};
const TablePage = Form.create({})(TableForm);

export default TablePage;
