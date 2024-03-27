
import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { Form, Button, Input } from 'antd';

const UserForm = () => {
  const { addUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  return (
    // <div className='FetchData'>
    //   <Form >
    //     <div className='formpage'>
    //       <div>
    //         <Form.Item label="First Name">
    //           <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <Form.Item label="Last Name">
    //           <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
    //         </Form.Item>
    //       </div>
    //       <div>
    //         <Form.Item label="Email">
    //           <input type="email" name="email" value={formData.email} onChange={handleChange} />
    //         </Form.Item>
    //       </div>
    //     </div>
    //     <div className='addbtn'>
    //       <Button onClick={handleSubmit}>Add user</Button>
    //     </div>
    //   </Form>
    // </div>

    <div className='FetchData'>


      <Form >
        <div className='formpage'>

          <div>
            <Form.Item label="First Name">

              <Input name="firstName" placeholder="Name" value={formData?.firstName} onChange={handleChange} />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Last Name">

              <Input name="lastName" placeholder="last name" value={formData?.lastName} onChange={handleChange} />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Email">

              <Input name="email" placeholder="Email" value={formData?.email} onChange={handleChange} />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Phone Number">

              <Input name="phoneNumber" placeholder="Phone Number" value={formData?.phoneNumber} onChange={handleChange} />
            </Form.Item>
          </div>

        </div>


        <div className='addbtn'>
          <Button type="primary" onClick={handleSubmit} >
            Add user
          </Button>
        </div>



      </Form>




    </div>
  );
};

export default UserForm;
