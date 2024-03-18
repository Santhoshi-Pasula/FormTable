import React, { createContext } from 'react'
import ChildB from './ChildB'

export const UserContext= createContext()

const ContextHook = () => {
  let isAdmin="true";

  let user={
    name:'santhoshi',
    email:'santhoshi@gmail.com'
  }

  return (
    <div>
      <UserContext.Provider value={user} >
      <ChildB />
      </UserContext.Provider>
      
    </div>
  )
}

export default ContextHook
