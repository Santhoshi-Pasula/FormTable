
import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { Form ,Button} from 'antd';

const UserForm = () => {
  const { addUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
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
    <div className='FetchData'>
      <Form >
        <div className='formpage'>
          <div>
            <Form.Item label="First Name">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Last Name">
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Email">
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Item>
          </div>
        </div>
        <div className='addbtn'>
          <Button onClick={handleSubmit}>Add user</Button>
        </div>
      </Form>
    </div>
  );
};

export default UserForm;
