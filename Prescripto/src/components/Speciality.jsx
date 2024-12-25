import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const Speciality = () => {
  return (
    <div id="speciality" className="px-6 py-12 bg-gray-50">
      {/* Title and description */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-black mb-4">
          Find by Speciality
        </h1>
        <p className="text-lg text-gray-700">
          Simply browse through our extensive list of trusted doctors and
          schedule your appointment.
        </p>
      </div>

      {/* Specialities list */}
      <div className="flex flex-wrap justify-center gap-8">
        {specialityData.map((item, index) => {
          return (
            <Link
              onClick={() => scrollTo(0, 0)}
              key={index}
              to={`/doctors/${item.speciality}`}
              className="flex flex-col items-center text-center"
            >
              {/* Image of the speciality */}
              <img
                src={item.image}
                alt={item.speciality}
                className="w-32 h-32 object-cover rounded-full shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              />

              {/* Speciality name */}
              <p className="mt-4 text-xl text-gray-800">{item.speciality}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Speciality;
