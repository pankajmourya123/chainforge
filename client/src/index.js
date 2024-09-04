import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Toaster } from 'react-hot-toast'; // Import Toaster

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Toaster /> {/* Add Toaster here */}
  </React.StrictMode>,
  document.getElementById('root')
);
