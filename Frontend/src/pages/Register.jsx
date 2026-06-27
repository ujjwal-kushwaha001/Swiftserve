import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [formData, setFormData] = useState({ name: '', email: '', password: '', location: '', businessName: ''});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Notice the URL points to our Backend!
      const res = await axios.post('http://localhost:4999/api/auth/register', formData);
      console.log("This is Response Datas",res);
      
      alert(res.data.msg);
      navigate('/login'); // Redirect to login after success
    } catch (err) {
      alert(err.response.data.msg || "Registration Failed");
    }
  };


  return (
    <div className="flex  items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Provider Account</h2>
        <div className="">
          <input 
          type="text" placeholder="Name" className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
        />
        <input 
          type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        <input 
          type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        />
        </div>

         <div className="">
          <input 
          type="text" placeholder="Business Name" className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({...formData, businessName: e.target.value})}  required
        />
        <input 
          type="text" placeholder="Location of Business" className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({...formData, location: e.target.value})}  required
        />
        </div>
        
        
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
        <p className="mt-4 text-sm text-center">
          have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
        </p>
      </form>
    </div>
  )
}

export default Register
