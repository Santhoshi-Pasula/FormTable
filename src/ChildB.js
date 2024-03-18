import React, { createContext, useContext } from 'react';
import { UserContext } from './ContextHook';
import ChildA from './ChildA'



const ChildB = () => {
  let data = useContext(UserContext)

  return (
    <div>
      <h3>This is ChildB component</h3>
      <h3>Name: {data.name}</h3>
      <h3>Email: {data.email}</h3>
     
    </div>
  );
};

export default ChildB;
