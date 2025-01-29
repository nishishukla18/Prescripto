import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';

function Interface() {
  const { aToken, getDashData, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.doctor_icon} alt="Doctor Icon" />
          <div>
            <p>{dashData.doctors}</p>
            <p>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.appointment_icon} alt="Appointment Icon" />
          <div>
            <p>{dashData.appointments}</p>
            <p>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.patients_icon} alt="Patients Icon" />
          <div>
            <p>{dashData.patients}</p>
            <p>Patients</p>
          </div>
        </div>
      </div>
      <div className="bg-white mt-5">
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border'>
          <img src={assets.list_icon} alt="List Icon" />
          <p>Latest Bookings</p>
        </div>
        <div>
          {
            dashData.latestAppointments.map((appointment, index) => (
              <div key={index} className='flex items-center gap-2.5 px-4 py-4 mt-2.5 rounded border'>
                <img src={appointment.docData.image || assets.default_avatar} alt="Doctor" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p>{appointment.docData.name}</p>
                  <p>{appointment.slotDate}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Interface;