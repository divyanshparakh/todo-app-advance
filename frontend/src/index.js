import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Accept": "application/vnd.api+json",
    "Authorization": localStorage["token"],
  }
})

// reportWebVitals();

export default api;