import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PublicProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    time: "",
  });

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4999/api/services/book", {
        providerId: id,
        customerName: customerData.name,
        customerEmail: customerData.email,
        appointmentTime: customerData.time,
        serviceName: selectedService.serviceName,
      });
      alert("Appointment Booked! The provider will see it on their dashboard.");
      setSelectedService(null); // Close the form
    } catch (err) {
      alert("Booking failed. Please try again.");
    }
  };

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4999/api/services/public/${id}`,
        );
        setProvider(res.data);
      } catch (err) {
        console.error("Provider not found");
      }
    };
    fetchPublicData();
  }, [id]);

  if (!provider)
    return <div className="text-center mt-20">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
        
        {selectedService && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white p-8 rounded-2xl max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Book {selectedService.serviceName}</h2>
      <form onSubmit={handleBooking} className="space-y-4">
        <input 
          type="text" placeholder="Your Name" required className="w-full p-2 border rounded"
          onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
        />
        <input 
          type="email" placeholder="Your Email" required className="w-full p-2 border rounded"
          onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
        />
        <input 
          type="datetime-local" required className="w-full p-2 border rounded"
          onChange={(e) => setCustomerData({...customerData, time: e.target.value})}
        />
        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-green-600 text-white p-2 rounded-lg">Confirm Booking</button>
          <button type="button" onClick={() => setSelectedService(null)} className="flex-1 bg-gray-200 p-2 rounded-lg">Cancel</button>
        </div>
      </form>
    </div>
  </div>
)}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">
          {provider.businessName || provider.name}
        </h1>
        <p className="text-gray-500">Select a service to book an appointment</p>
      </div>

      <div className="grid gap-6">
        {provider.services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{service.serviceName}</h2>
              <p className="text-gray-500">{service.duration} Minutes</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-800">
                ₹{service.price}
              </span>
              <button
                onClick={() => setSelectedService(service)}
                className="block mt-2 bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicProfile;
