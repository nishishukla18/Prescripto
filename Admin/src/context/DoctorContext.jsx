import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const DoctorContextProvider = ({ children }) => {
  const [dToken, setDtoken] = useState(localStorage.getItem("dToken") || "");

  useEffect(() => {
    if (dToken) {
      localStorage.setItem("dToken", dToken);
    } else if (localStorage.getItem("dToken")) {
      localStorage.removeItem("dToken");
    }
  }, [dToken]);

  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { dtoken: dToken } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointment`, { appointmentId }, { headers: { dtoken: dToken } });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, { headers: { dtoken: dToken } });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, { headers: { dtoken: dToken } });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, { headers: { dtoken: dToken } });
      if (data.success) {
        setProfileData(data.doctorProfileData);
        console.log(data.doctorProfileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const value = {
    backendUrl,
    dToken,
    setDtoken,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
    getProfileData,
    profileData,
    setProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;