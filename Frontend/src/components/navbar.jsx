import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { ToastContainer } from 'react-toastify'

const navbar = () => {
    const navigate = useNavigate();
  return (
    <>
    <ToastContainer position="top-right" autoClose={2000} />
      <div className=" bg-cyan-950 flex justify-between p-2.5 px-3 text-amber-50">
      <h1 className=' font-bold text-2xl flex items-center'> <img src={logo} width={100} alt="" />SwiftServe</h1>
      <ul className=' flex justify-around items-center gap-5 hover:cursor-pointer p-1'>
        <li onClick={()=>navigate('/')} className=' hover:text-[17px] hover:text-amber-50'>Home</li>
        <li onClick={()=>navigate('/about')} className=' hover:text-[17px] hover:text-amber-50'>About</li>
        <li onClick={()=>navigate('/blogs')} className=' hover:text-[17px] hover:text-amber-50'>Blogs</li>
        <li onClick={()=>navigate('/Allservices')} className=' hover:text-[17px] hover:text-amber-50'>Services</li>
        <li onClick={()=>navigate('/contact')} className=' hover:text-[17px] hover:text-amber-50'>Contact Us</li>
      </ul>
      <div className=" flex justify-between items-center gap-3">
        <button onClick={()=>navigate('/register')} className=' cursor-pointer bg-amber-100 px-3 py-1.5 text-black rounded-3xl'>Register Your Business</button>
        <button onClick={()=>navigate('/login')}  className=' cursor-pointer bg-amber-100 px-3 py-1.5 text-black rounded-3xl'>Log in</button>
      </div>
      
    </div>
    </>
  )
}

export default navbar
