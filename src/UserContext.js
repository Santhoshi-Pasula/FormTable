
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children}) => {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const editUser = (record, updatedUser) => {
    const updatedUsers = [...users];
    updatedUsers[record] = updatedUser;
    setUsers(updatedUsers);
  };

  const deleteUser = (record) => {
    const updatedUsers = [...users];
    updatedUsers.splice(record, 1);
    setUsers(updatedUsers);
  };

  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
