import React from 'react';
import { assets } from '../assets/assets';

function Header() {
  return (
    <div className='bg-primary flex flex-col md:flex-row items-center justify-between rounded-lg px-6 md:px-10 py-10 gap-4'>
      {/* Left section */}
      <div className="left md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-[10vw]">
        <p className="text-4xl md:text-4xl font-bold text-white">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex items-center gap-4">
          {/* Adjust the size and ensure proper spacing of the image */}
          <img 
            src={assets.group_profiles} 
            alt="Group of doctors" 
            
          />
          <p className="text-sm md:text-base text-white">
            Simply browse through our extensive list of trusted doctors,
            <br />
            and book your appointment easily.
          </p>
        </div>
        <a href="#speciality" className="flex items-center gap-2 text-gray-800 font-semibold bg-white p-4 rounded-full">
          Book appointment
          <img src={assets.arrow_icon} alt="Arrow icon" className="w-5 h-5" />
        </a>
      </div>

      {/* Right section */}
      <div className="right md:w-1/2 flex justify-center md:justify-end">
        <img 
          src={assets.header_img} 
          alt="Header" 
          className="w-full md:w-2/3 object-contain" 
        />
      </div>
    </div>
  );
}

export default Header;
