import React, { useContext } from 'react';
//import { doctors } from '../assets/assets';

import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const {doctors} = useContext(AppContext)
  return (
    <div className="px-6 py-12 bg-gray-50">
      {/* Section Title */}
      <p className="text-3xl font-semibold text-primary text-center mb-8">Top Doctors</p>
      
      {/* Doctors Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {doctors.slice(0, 10).map((item, index) => {
          return (
            <div
              key={index}
              className="w-full  bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              onClick={() => navigate(`/appointment/${item._id}`)}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full bg-blue-100 object-cover rounded-t-lg"
              />
              
              {/* Card Content */}
              <div className="p-4 flex flex-col items-center">
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.speciality}</p>
                <p className="mt-2 text-green-600 text-xs font-medium">Available</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopDoctors;
