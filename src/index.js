import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import FormPage from './components/FormPage';
import LifecyclePage from './LifecyclePage';
import Form from './Form';
import TableForm from './TableForm';

import Hooks from './Hooks';
import EventTable from './EventTable';
import ContextHook from './ContextHook';
import CallbackHook from './CallbackHook';
import FormTable from './FormTable';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
