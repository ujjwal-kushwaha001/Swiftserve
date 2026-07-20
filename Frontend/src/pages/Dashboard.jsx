import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { UserStar } from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [providerId, setProviderId] = useState('');
  const [newService, setNewService] = useState({ serviceName: '', price: '', duration: '', currentSlot: '' });
  const [bookings, setBookings] = useState([]);

  // const bookingUrl = `${window.location.origin}/book/${}`;
  const navigate = useNavigate();




  // 1. Function to fetch data from backend
  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      // We need a GET route for this on the backend
      const res = await axios.get('http://localhost:4999/api/services', {
        headers: { 'x-auth-token': token }
      });

      if (res.data && res.data.services) {
      setServices(res.data.services); 
      setProviderId(res.data.userId); // Save user id to state
    }

    } catch (err) {
      console.error("Error fetching services");
    }
  };

  const fetchBookings = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:4999/api/services/my-bookings', {
      headers: { 'x-auth-token': token }
    });
    setBookings(res.data);
  } catch (err) {
    console.error("Error fetching bookings");
  }
};

  // Check if token exists, if not, kick them to login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    else{
      fetchServices();
      fetchBookings();
      
    }
    
  }, []);

  useEffect(() => {
  console.log("Services state has officially updated:", services,providerId);
}, [services,providerId]);

  // 2. Function to save a new service
  const handleAddService = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:4999/api/services', newService, {
        headers: { 'x-auth-token': token }
      });
      setServices(res.data); // Update the list with the new data from server
      setNewService({ serviceName: '', price: '', duration: '', currentSlot: '' }); // Clear the form
      alert("Service added successfully!");
    } catch (err) {
      console.log(err.response.data); // This will print the actual error to your console
  alert(err.response?.data?.msg || "Failed to add service");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const deleteService = async(serviceName, duration, Price)=>{
    try {
      const res = await axios.post('http://localhost:4999/api/services/deleteService', {serviceName, duration, Price, providerId}, {
        method: 'DELETE',
      });
      setServices(res.data);
      alert("Service Deleted successfully!");
    } catch (error) {
      console.log(error); 
    }

  }



  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        
        <h1 className="text-3xl font-bold text-gray-800">Your Services</h1>
        <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); toast.error("Logout successfully") }} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      {/* Form */}
      <form onSubmit={handleAddService} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            type="text" placeholder="Service Name" className="p-2 border rounded" value={newService.serviceName}
            onChange={(e) => setNewService({...newService, serviceName: e.target.value})} required
          />
          <input 
            type="number" placeholder="Price (₹)" className="p-2 border rounded" value={newService.price}
            onChange={(e) => setNewService({...newService, price: e.target.value})} required
          />
          <input 
            type="number" placeholder="Duration (min)" className="p-2 border rounded" value={newService.duration}
            onChange={(e) => setNewService({...newService, duration: e.target.value})} required
          />
        </div>

       <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add Service</button>
      </form>

      {/* Display List */}
      <div className="grid gap-4">
        {services.map((s, index) => (
          
          <div key={index} className="bg-white border p-4 rounded shadow border-l-4 border-blue-500 flex justify-between">
            <div>
              <h3 className="font-bold text-lg">{s.serviceName}</h3>
              <p className="text-gray-600">{s.duration} Min</p>
            </div>
            <div className="text-xl font-bold text-blue-600">₹{s.price}</div>

            {/* QR Code Container */}
      <div className="flex flex-col items-center bg-gray-50 p-2 rounded-lg border">
        <QRCodeSVG 
          value={`${window.location.origin}/book/${providerId}`} 
          size={80} 
          bgColor={"#ffffff"} 
          fgColor={"#1d4ed8"} // Custom blue color matching your buttons
          includeMargin={true}
        />
        <span className="text-[10px] font-semibold text-gray-500 mt-1 uppercase tracking-wider">Scan to Book</span>
      </div>
      <div className=" flex flex-col  gap-3">

        <div onClick={()=>deleteService(s.serviceName, s.duration, s.price)} className="cancel-boc flex items-center justify-between gap-2 px-3 cursor-pointer hover:bg-red-950  bg-yellow-800 text-amber-50 rounded-full">
        <p>Delete Service</p>
        <i className="fa-solid fa-x"></i>
      </div>
      <div className="cancel-boc flex items-center justify-between gap-2 px-3  bg-indigo-950 text-amber-50 rounded-full cursor-pointer">
        <p>Edit Service</p>
        <i class="fa-solid fa-pen-to-square"></i>
      </div>

      </div>
     

          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
  <h2 className="text-xl font-semibold mb-4 text-blue-700">Incoming Appointments</h2>
  {bookings.length === 0 ? (
    <p className="text-gray-500">No appointments yet.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-600">
            <th className="py-2">Customer</th>
            <th className="py-2">Service</th>
            <th className="py-2">Time</th>
            <th className="py-2">Unique Code</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="border-b hover:bg-gray-50">
              <td className="py-3 font-medium">{b.customerName}</td>
              <td className="py-3 text-gray-600">{b.serviceName}</td>
              <td className="py-3 text-sm text-blue-500">
                {`${b.appointmentTime}  ${b.appointmentDate}`}
              </td>
              <td className="py-3 text-gray-600">{b.uniqueCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
    </div>
  );
};

export default Dashboard;