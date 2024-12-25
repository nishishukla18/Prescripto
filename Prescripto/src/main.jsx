import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Importing global styles
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext';

// Root rendering
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
    <App />
  </AppContextProvider>
  </BrowserRouter>
);
