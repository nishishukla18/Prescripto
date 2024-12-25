import React from 'react';
import { assets } from '../assets/assets';

function Contact() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  p-8">
      {/* Contact Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-6xl">
        
        {/* Image Section */}
        <div className="md:w-1/2 w-full h-full">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full h-full object-cover  rounded-md"
          />
        </div>

        {/* Contact Details Section */}
        <div className="md:w-1/2 w-full h-full  rounded-md p-6 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Contact <span className="text-blue-600">Us</span>
          </h1>

          <div className="text-gray-600 text-sm leading-7 mb-4">
            <p className="mb-2">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p className="mb-2">
              <strong>Email:</strong> contact@company.com
            </p>
            <p className="mb-2">
              <strong>Address:</strong> 123 Business Ave, Suite 101, City, State, 12345
            </p>
          </div>

          <p className="text-gray-600 text-sm leading-7">
            We would love to hear from you! Whether you have a question, feedback, 
            or need assistance, feel free to reach out to us. Our team is ready to help!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
