import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Stock from './Stock';
import Header from './components/Header';
import Signup from './components/Signup';
import News from './components/News';
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login'; // Import Login

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App/>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Stock />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/news' element={<News />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
