import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4999/api/auth/login', formData);
      
      // Save the "VIP Wristband" (Token) to the browser
      localStorage.setItem('token', res.data.token);
      
      alert("Login Successful!");
      navigate('/dashboard'); // We will build this next!
    } catch (err) {
      alert(err.response?.data?.msg || "Login Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-96 border-t-4 border-blue-500">
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
        <button className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition">
          Sign In
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/register')}>Register</span>
        </p>
      </form>
    </div>
  )
}

export default Login
