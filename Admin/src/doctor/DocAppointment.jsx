
import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

function DocAppointment() {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments(dToken);
    }
  }, [dToken, getAppointments]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Appointments</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Patient</th>
              <th className="border border-gray-300 px-4 py-2">Payment</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
              <th className="border border-gray-300 px-4 py-2">Fees</th>
              <th className="border border-gray-300 px-4 py-2">Slot & Date</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.slice().reverse().map((appointment, index) => (
              <tr
                key={appointment._id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2 flex items-center">
                  <img
                    src={appointment.userData?.image || "/default-avatar.png"}
                    alt="Patient"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p>{appointment.userData?.name || "N/A"}</p>
                    <p className="text-sm text-gray-600">
                      {appointment.userData?.email || "N/A"}
                    </p>
                  </div>
                </td>
                <td className="border border-gray-300 text-red-500 px-4 py-2">
                  {appointment.payment ? "Online" : "CASH"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {calculateAge(appointment.userData?.dob) || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appointment.amount ? `${appointment.amount}$` : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appointment.slotDate || "N/A"},
                  <br />
                  {appointment.slotTime || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appointment.cancelled ? (
                    <p className="text-red-500 font-semibold">Cancelled</p>
                  ) : appointment.isCompleted ? (
                    <p className="text-green-500 font-semibold">Completed</p>
                  ) : (
                    <div className="flex space-x-2">
                      <img
                        onClick={() => cancelAppointment(appointment._id)}
                        className="w-10 cursor-pointer"
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                      <img
                        onClick={() => completeAppointment(appointment._id)}
                        className="w-10 cursor-pointer"
                        src={assets.tick_icon}
                        alt="Complete"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocAppointment;
