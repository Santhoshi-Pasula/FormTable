
import React from 'react';


import UserTable from './UserTable';
import { UserProvider } from './UserContext';
import UserForm from './UserForm';
import './App.scss'


const FormContextApi = () => {
  return (
    <UserProvider>
      <h3>useContext with CRUD operations</h3>
      
       <div>
        <h3>User Form</h3>
        <UserForm />
        <h3>User Details</h3>
        <UserTable />
      </div>
    </UserProvider>
  );
};

export default FormContextApi;
