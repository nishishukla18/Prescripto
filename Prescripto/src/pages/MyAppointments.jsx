// import React, { useContext } from 'react';
// import { AppContext } from '../context/AppContext';

// function MyAppointments() {
//   const { doctors } = useContext(AppContext);

//   return (
//     <div className="p-4 bg-gray-100">
//       {/* Header */}
//       <h2 className="text-2xl font-bold text-center mb-6">My Appointments</h2>

//       {/* Appointment Cards */}
//       <div className="grid gap-4">
//         {doctors.slice(0, 3).map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col sm:flex-row bg-white p-4 border rounded-lg"
//           >
//             {/* Doctor's Image */}
//             <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 rounded-full object-cover"
//               />
//             </div>

//             {/* Appointment Details */}
//             <div className="flex-grow">
//               <p className="text-lg font-semibold">{item.name}</p>
//               <p className="text-sm text-gray-700">{item.speciality}</p>
//               <div className="mt-2">
//                 <p className="text-sm font-medium">Address:</p>
//                 <p className="text-sm text-gray-600">{item.address.line1}</p>
//                 <p className="text-sm text-gray-600">{item.address.line2}</p>
//               </div>
//               <p className="mt-2 text-sm">
//                 <span className="font-medium">Date & Time:</span> 20 Dec, 2025
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col space-y-2">
//               <button className="px-4 py-2  text-primary rounded-md">
//                 Pay Online
//               </button>
//               <button className="px-4 py-2  text-red-600 rounded-md">
//                 Cancel 
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MyAppointments;

import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function MyAppointments() {
  const { doctors } = useContext(AppContext);

  return (
    <div className="p-4 bg-gray-100">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-6">My Appointments</h2>

      {/* Appointment Cards */}
      {doctors.length > 0 ? (
        <div className="grid gap-4">
          {doctors.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row bg-white p-4 border rounded-lg shadow-md"
            >
              {/* Doctor's Image */}
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                <img
                  src={item.image || "/default-doctor.jpg"} // Fallback for missing image
                  alt={item.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>

              {/* Appointment Details */}
              <div className="flex-grow">
                <p className="text-lg font-semibold">{item.name || "N/A"}</p>
                <p className="text-sm text-gray-700">
                  {item.speciality || "General Practitioner"}
                </p>
                <div className="mt-2">
                  <p className="text-sm font-medium">Address:</p>
                  <p className="text-sm text-gray-600">
                    {item.address?.line1 || "Address Line 1"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.address?.line2 || "Address Line 2"}
                  </p>
                </div>
                <p className="mt-2 text-sm">
                  <span className="font-medium">Date & Time:</span> 20 Dec, 2025
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col space-y-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Pay Online
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No appointments found.</p>
      )}
    </div>
  );
}

export default MyAppointments;
