import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary py-8 px-4 sm:px-6 md:px-8 rounded-lg my-8">
      <div className="flex items-center justify-between flex-col md:flex-row">
        {/* Left Section - Text */}
        <div className="text-center md:text-left w-full md:w-1/2 space-y-3">
          <p className="text-xl sm:text-2xl font-semibold text-white">Book Appointment</p>
          <p className="text-xs sm:text-sm text-white opacity-80">With 100+ trusted Doctors</p>
          
          <button
            onClick={() => { navigate('/login'); }}
            className="bg-white text-primary px-4 py-2 rounded-full font-semibold mt-4 hover:bg-gray-200 transition-all"
          >
            Create Account
          </button>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block md:w-1/2 lg:w-[250px] relative mt-4 md:mt-0">
          <img
            src={assets.appointment_img}
            alt="Appointment"
            className="rounded-lg w-full max-w-[200px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
