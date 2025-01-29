import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { AppContext } from '../context/AppContext';

function AllAppointments() {
  const { aToken, appointments, getAllAppointments,cancelAppointment } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Appointments</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Patient</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
              <th className="border border-gray-300 px-4 py-2">Date & Time</th>
              <th className="border border-gray-300 px-4 py-2">Doctor</th>
              <th className="border border-gray-300 px-4 py-2">Fees</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={appointment.userData.image || '/default-avatar.png'} // Replace with actual image URL or fallback
                    alt="Patient"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appointment.userData.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {calculateAge(appointment.userData.dob)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appointment.slotDate} at {appointment.slotTime}
                </td>
                <td className="border border-gray-300 px-2 py-2 flex">
                <img className='h-[50px] w-[50px]' src={appointment.docData.image} alt="" />
                  {appointment.docData.name}
                  
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appointment.amount}$
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appointment.cancelled ?
                  <p className='text-red-600'>Cancelled</p>:
                  <button onClick={()=>cancelAppointment(appointment._id)} className="text-red-600  px-3 py-1  hover:bg-red-400 transition-colors hover:text-white">
                  X
                </button>
                  }
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAppointments;