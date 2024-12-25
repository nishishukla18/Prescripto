import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

function Appointment() {
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([[]]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    if (doctor) {
      setDocInfo(doctor);
    } else {
      toast.error("Doctor not found.");
      navigate("/doctors");
    }
  };

  const getAvailableSlots = () => {
    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10), 0, 0, 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const daySlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        daySlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(daySlots);
    }

    setDocSlots(slots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment.");
      return navigate("/login");
    }
  
    if (!slotTime) {
      toast.warn("Please select a time slot.");
      return;
    }
  
    try {
      const selectedDate = docSlots[selectedDay][0]?.datetime;
      if (!selectedDate) {
        toast.error("Invalid date selected.");
        return;
      }
  
      const date = new Date(selectedDate);
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
  
      console.log("Payload being sent:", { docId, slotDate, slotTime });
  
      // API request
      const response = await axios.post(
        `${backendUrl}/api/user/bookAppointment`,
        { docId, slotDate, slotTime },
        { headers: { token } } // Token sent as a header named "token"
      );
  
      if (response.data.success) {
        toast.success("Appointment booked successfully!");
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(response.data.message || "Failed to book appointment.");
      }
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to book appointment.");
    }
  };
  

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 md:p-8">
      {docInfo && (
        <>
          <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{docInfo.name}</h2>
            <p className="text-lg text-blue-600 font-medium">{docInfo.speciality}</p>
            <p className="text-gray-600 mt-2">{docInfo.about}</p>
          </div>

          <div className="w-full max-w-4xl">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Select a Day</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {docSlots.map((_, index) => (
                <button
                  key={index}
                  className={`w-full px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
    selectedDay === index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-blue-100"
                  }`}
                  onClick={() => setSelectedDay(index)}
                >
                  Day {index + 1} - {new Date(docSlots[index][0]?.datetime).toLocaleDateString()}
                </button>
              ))}
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-4">Available Slots</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {docSlots[selectedDay]?.map((slot, index) => (
                <button
                  key={index}
                  className={`w-full px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
    slot.time === slotTime
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-blue-100"
                  }`}
                  onClick={() => setSlotTime(slot.time)}
                >
                  {slot.time}
                </button>
              ))}
            </div>

            <button
              onClick={bookAppointment}
              className="mt-6 w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg text-sm md:text-base font-medium hover:bg-blue-700 transition-all duration-300"
            >
              Book Appointment
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Appointment;