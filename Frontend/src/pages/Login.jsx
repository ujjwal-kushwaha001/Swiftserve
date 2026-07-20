import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'

const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault() 
    try {
      
      const res = await axios.post('http://localhost:4999/api/auth/login',formData);
      localStorage.setItem('token', res.data.token);
      // Redirect straight to dashboard
      navigate('/dashboard');
      toast.success("Login Successfully");
    } catch (err) {
      alert('Invalid Crediantials')
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-lg w-96 border-t-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Provider Login</h2>
        <input 
          type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded focus:outline-blue-400"
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required
        />
        <input 
          type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded focus:outline-blue-400"
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required
        />
        <button className='w-full h-fit text-white bg-cyan-950 p-2 mb-4 border rounded focus:outline-blue-400'>Submit</button>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/register')}>Register</span>
        </p>
      </form>
    </div>
  )
}

export default Login
