import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function MyAppointments() {
  const { backendUrl, token ,getDoctorsData} = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios(`${backendUrl}/api/user/appointments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUsersAppointments();
    }
  }, [token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancelAppointment`,
        { appointmentId },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      if (data.success) {
        getUsersAppointments();
        getDoctorsData()

        toast.success(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-6">My Appointments</h2>

      {/* Appointment Cards */}
      {appointments.length > 0 ? (
        <div className="grid gap-4">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row bg-white p-4 border rounded-lg shadow-md"
            >
              {/* Doctor's Image */}
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                <img
                  src={appointment.docData.image || "/default-doctor.jpg"} // Fallback for missing image
                  alt={appointment.docData.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>

              {/* Appointment Details */}
              <div className="flex-grow">
                <p className="text-lg font-semibold">{appointment.docData.name || "N/A"}</p>
                <p className="text-sm text-gray-700">
                  {appointment.docData.speciality || "General Practitioner"}
                </p>
                <div className="mt-2">
                  <p className="text-sm font-medium">Address:</p>
                  <p className="text-sm text-gray-600">
                    {appointment.docData.address}
                  </p>
                 
                </div>
                <p className="mt-2 text-sm">
                  <span className="font-medium">Date & Time:</span> {appointment.slotDate} at {appointment.slotTime}
                </p>
              </div>


              {/* Action Buttons */}
              <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col space-y-2">
               {!appointment.cancelled && (
                  <button onClick={alert("Payment gateway not implemented")}
                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-blue-500 hover:text-white"
                  >
                    Pay
                  </button>
                )} 
                {!appointment.cancelled && (
                  <button
                    onClick={() => cancelAppointment(appointment._id)}
                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-red-500 hover:text-white"
                  >
                    Cancel
                  </button>
                )}
                {
                  appointment.cancelled && <button classname="text-red-500">Appointment Cancelled</button>  
                }
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