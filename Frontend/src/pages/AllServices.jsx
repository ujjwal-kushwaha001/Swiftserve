import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "axios"; // Or just regular axios
import React from "react";
import { QRCodeSVG } from "qrcode.react";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const res = await axiosInstance.get(
          "http://localhost:4999/api/services/all",
        );
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching marketplace services", err);
      }
    };
    fetchAllServices();
  }, []);

  // Filter services based on search input
  const filteredServices = services.filter(
    (s) =>
      s.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.businessName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
  console.log("Services state has officially updated:", services);
  }, [services])
  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Explore Services
          </h1>
          <p className="text-gray-600 text-lg">
            Discover and book local small businesses instantly
          </p>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search for services or businesses..."
            className="mt-6 max-w-md w-full p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No services found Right Now.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    {service.businessName}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mt-3 mb-1">
                    {service.serviceName}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {service.duration} mins
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3.5">
                  <QRCodeSVG
                    value={`${window.location.origin}/book/${service.providerId}`}
                    size={50}
                  />
                  <div>
                    <span className="text-2xl font-black text-gray-900">
                      ₹{service.price}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/book/${service.providerId}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl text-sm transition"
                >
                  View & Book
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
