import { useState } from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PublicProfile from './pages/PublicProfile';

import AllServices from './pages/AllServices';
import Home  from './pages//Home';

import Navbar from './components/navbar'
import Footer from './components/footer'
import About from './pages/About';

function App() {

  return (
    <>
    
      <Router>
        <Navbar/>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/book/:id" element={<PublicProfile />} />
          <Route path='/Allservices' element={<AllServices />} />
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About/>} />
        </Routes>
      </div>
       <Footer/>
    </Router>
   
    </>
  )
}

export default App
