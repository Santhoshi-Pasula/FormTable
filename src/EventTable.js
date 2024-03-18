
import { Button, Checkbox, DatePicker, Input, Select, Form } from 'antd'

import './App.scss';
// {useHistory} from 'react-router-dom'
import React, { useState } from 'react';


function EventTable() {
    //const history=useHistory();
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        phoneNumber: '',
        email: ''
    });
    const { firstname, lastname, phoneNumber, email } = data;
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: [e.target.value] })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data);
        //alert(`First name: ${data.firstname}, Last Name: ${data.lastname}, Email: ${data.email}, Phone Number :${data.phoneNumber}`);

    }
    
    return (
        <div className="Formpage">


            <Form >
                <h3> login page</h3>
                <div className='content'>
                    <div>
                        <label>First name</label>
                        <Input type='text' name='firstname' id="firstname" value={firstname} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <Input type='text' name='lastname' id="lastname" value={lastname} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email</label>
                        <Input type='email' name='email' id="email" value={email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <Input type='phoneNumber' name='phoneNumber' id="phoneNumber" value={phoneNumber} onChange={handleChange} />
                    </div>
                </div>
                <div className='submitbtn'>
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>

            </Form>
        </div>
    );
}

export default EventTable;
