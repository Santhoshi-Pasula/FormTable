import React from 'react'
import Form from './Form'
import EventTable from './EventTable'
import FormTable from './FormTable'
import TablePage from './TableForm'
import LifecyclePage from './LifecyclePage'
import ContextHook from './ContextHook'
import Hooks from './Hooks'
import UseMemoHook from './UseMemoHook'
import UseRefHook from './UseRefHook'
import CallbackHook from './CallbackHook'
import Cart from './Cart'
import Users from './Users'
import Carts from './Carts'
import CartApiData from './CartApiData'
import FormApiData from './FormApiData'
import FormApiTable from './FormApiTable'


const App = () => {
  return (
    <div className='app'>
      <FormApiData/>
      {/* <CartApiData/> */}
      
      <ContextHook/>
      {/* <Carts/>
      <Users/>
      <Form/>
      <Cart/>
      <EventTable/>
      <FormTable/>
      <LifecyclePage/>
      <Hooks/>
      <UseRefHook/>
      <CallbackHook/>
      <UseMemoHook/>
      
      
      
      <TablePage/> */}
      
    </div>
  )
}

export default App
