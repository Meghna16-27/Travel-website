import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";//navigate use for logical link
import './App.css';

import Header from './components/Header';
import Index from './components/Index';

import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import DestinationDetails from "./components/DestinationDetails";
import Admin from "./components/Admin";
import PrivateRoute from './components/PrivateRoute';
import Add from './components/Add';
import Edit from './components/Edit';
import Booknow from './components/Booknow';
import Payment from './components/Payment';
import Thankyou from './components/Thankyou';




function App() {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/add" element={<Add />} />
        <Route path="/booknow" element={<Booknow />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/thankyou" element={<Thankyou />} />
      
        

        {/* Admin Access Check */}
        <Route 
        path="/admin"
        element={
          <PrivateRoute>
            <Admin/>
          </PrivateRoute>
        }
        />
        {/*{/*booking acess */}
        
         </Routes>
      <Footer />
    </div>
  );
}

export default App;


