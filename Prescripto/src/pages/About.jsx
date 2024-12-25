import React from 'react';
import { assets } from '../assets/assets';

function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-8">
      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-6xl mb-12">
        {/* Image Section */}
        <div className="md:w-1/2 w-full h-full">
          <img
            src={assets.about_image}
            alt="About Us"
            className="w-full h-full object-cover  rounded-md"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 w-full h-full  rounded-md p-6 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ABOUT <span className="text-blue-600">US</span>
          </h1>
          <p className="text-gray-600 text-sm leading-7">
            Welcome to our organization! We are committed to providing the best 
            solutions tailored to your needs. Our team of professionals is dedicated 
            to delivering quality, innovation, and excellence in everything we do.
          </p>
          <p className="text-gray-600 text-sm leading-7 mt-4">
            Over the years, we have built a reputation for trust and reliability. 
            Whether you're an individual seeking growth opportunities or a business 
            aiming to scale new heights, we are here to guide you every step of the way.
          </p>
          <p className="text-gray-600 text-sm leading-7 mt-4">
            With our customer-first approach, cutting-edge technology, and a passion 
            for innovation, we are shaping a brighter future. Together, let’s create 
            success stories that inspire and impact lives positively.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Why <span className="text-blue-600">Choose Us</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Box 1: Convenience */}
          <div className="flex-1 bg-white border-2 border-gray-300 rounded-md p-6 text-center hover:bg-blue-50 hover:border-blue-600 hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Convenience</h3>
            <p className="text-gray-600 text-sm">
              Experience unparalleled ease and accessibility with our services, 
              designed to fit seamlessly into your life.
            </p>
          </div>

          {/* Box 2: Efficiency */}
          <div className="flex-1 bg-white border-2 border-gray-300 rounded-md p-6 text-center hover:bg-blue-50 hover:border-blue-600 hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Efficiency</h3>
            <p className="text-gray-600 text-sm">
              Save time and resources with our efficient and streamlined processes 
              that deliver exceptional results.
            </p>
          </div>

          {/* Box 3: Personalization */}
          <div className="flex-1 bg-white border-2 border-gray-300 rounded-md p-6 text-center hover:bg-blue-50 hover:border-blue-600 hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Personalization</h3>
            <p className="text-gray-600 text-sm">
              Enjoy tailored solutions crafted to meet your unique needs and preferences, 
              making every experience memorable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
