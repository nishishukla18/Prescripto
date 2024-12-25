import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Doctors() {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8">
      {/* Left Section: Menu */}
      <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
        <p className="text-lg font-bold mb-4 text-gray-800">Specialist Menu</p>
        <div className="flex flex-col space-y-2">
          <button onClick={()=>speciality==='General Physician '? navigate('/doctors'):navigate('/doctors/General Physician')} className="text-left text-gray-600 hover:text-gray-800 hover:font-medium">
            General Physician
          </button>
          <button onClick={()=>speciality==='Gynecologist'? navigate('/doctors'):navigate('/doctors/Gynecologist')} className="text-left text-gray-600 hover:text-gray-800 hover:font-medium">
            Gynecologist
          </button>
          <button onClick={()=>speciality==='Pediatricians'? navigate('/doctors'):navigate('/doctors/Pediatricians')} className="text-left text-gray-600 hover:text-gray-800 hover:font-medium">
            Pediatricians
          </button>
          <button onClick={()=>speciality==='Neurologist'? navigate('/doctors'):navigate('/doctors/Neurologist')} className="text-left text-gray-600 hover:text-gray-800 hover:font-medium">
            Neurologist
          </button>
          <button onClick={()=>speciality==='Gastroenterologist'? navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className="text-left text-gray-600 hover:text-gray-800 hover:font-medium">
            Gastroenterologist
          </button>
          <button onClick={()=>speciality==='Dermatologist'? navigate('/doctors'):navigate('/doctors/Dermatologist')} className="text-left text-gray-600 hover:text-gray-800 hover:font-medium">
            Dermatologist
          </button>
        </div>
      </div>

      {/* Right Section: Doctors Cards */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterDoc.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform transition-all duration-300 hover:scale-105"
            onClick={() => navigate(`/appointment/${item._id}`)}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full bg-blue-100 object-cover rounded-t-lg "
            />

            {/* Card Content */}
            <div className="p-4 flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
              <p className="mt-2 text-green-600 text-xs font-medium">Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
