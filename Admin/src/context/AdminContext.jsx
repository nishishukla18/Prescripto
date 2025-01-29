// import { createContext, useState, useEffect } from "react";
// import axios from 'axios';

// export const AdminContext = createContext();

// const AdminContextProvider = ({ children }) => {
//   const [appointments, setAppointments] = useState([]);
//   const [aToken, setAtoken] = useState(localStorage.getItem("aToken") || "");
//   const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     if (aToken) {
//       localStorage.setItem("aToken", aToken);
//     } else if (localStorage.getItem("aToken")) {
//       localStorage.removeItem("aToken");
//     }
//   }, [aToken]);

//   const getAllDoctors = async () => {
//     try {
//       const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } });
//       if (data.success) {
//         setDoctors(data.doctors);
//         console.log(data.doctors);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const changeAvailability = async (docId) => {
//     try {
//       const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } });
//       if (data.success) {
//         alert(data.message);
//         getAllDoctors();
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const getAllAppointments = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } });
//       if (data.success) {
//         console.log(data.appointments);
//         setAppointments(data.appointments);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const value = {
//     aToken,
//     setAtoken,
//     backendUrl,
//     doctors,
//     getAllDoctors,
//     changeAvailability,
//     appointments,
//     setAppointments,
//     getAllAppointments
//   };

//   return (
//     <AdminContext.Provider value={value}>
//       {children}
//     </AdminContext.Provider>
//   );
// };

// export default AdminContextProvider;



// import { createContext, useState, useEffect } from "react";
// import axios from 'axios';
// import {toast} from 'react-toastify'

// export const AdminContext = createContext();

// const AdminContextProvider = ({ children }) => {
//   const [appointments, setAppointments] = useState([]);
//   const [aToken, setAtoken] = useState(localStorage.getItem("aToken") || "");
//   const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
//   const [doctors, setDoctors] = useState([]);
//   const [dashData,setDashData] = useState(false)

//   useEffect(() => {
//     if (aToken) {
//       localStorage.setItem("aToken", aToken);
//     } else if (localStorage.getItem("aToken")) {
//       localStorage.removeItem("aToken");
//     }
//   }, [aToken]);

//   const getAllDoctors = async () => {
//     try {
//       const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { atoken: aToken } });
//       if (data.success) {
//         setDoctors(data.doctors);
//         console.log(data.doctors);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const changeAvailability = async (docId) => {
//     try {
//       const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { atoken: aToken } });
//       if (data.success) {
//         alert(data.message);
//         getAllDoctors();
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const getAllAppointments = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { atoken: aToken } });
//       if (data.success) {
//         console.log(data.appointments);
//         setAppointments(data.appointments);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

// const cancelAppointment = async (appointmentId) =>{
//   try {
//     const { data } = await axios.post(backendUrl + '/api/admin//cancel-appointment',{appointmentId},{headers:{aToken}})
//     if(data.success){
//       toast(data.success)
//       getAllAppointments();
//     }
//     else{
//       toast.error(data.message)
//     }
      
    
//   } catch (error) {
//     alert(error.message);
//     console.log(error.message)    
//   }
// }
// const getDashData = async ()=>{
//   try {
//     const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}})
//     if(data.success){
//       setDashData(data)
//       console.log(data.dashData)
//     }
//     else{
//       toast(data.success)
//     }
//   } catch (error) {
//     toast.error(error.message)
    
//   }
// }

//   const value = {
//     aToken,
//     setAtoken,
//     backendUrl,
//     doctors,
//     getAllDoctors,
//     changeAvailability,
//     appointments,
//     setAppointments,
//     getAllAppointments,
//     cancelAppointment,
//     getDashData,dashData
//   };

//   return (
//     <AdminContext.Provider value={value}>
//       {children}
//     </AdminContext.Provider>
//   );
// };

// export default AdminContextProvider;


import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [aToken, setAtoken] = useState(localStorage.getItem("aToken") || "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [doctors, setDoctors] = useState([]);
  const [dashData, setDashData] = useState(false);

  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
    } else if (localStorage.getItem("aToken")) {
      localStorage.removeItem("aToken");
    }
  }, [aToken]);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { atoken: aToken } });
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { atoken: aToken } });
      if (data.success) {
        alert(data.message);
        getAllDoctors();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { atoken: aToken } });
      if (data.success) {
        console.log(data.appointments);
        setAppointments(data.appointments);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { atoken: aToken } });
      if (data.success) {
        toast(data.success);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { atoken: aToken } });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast(data.success);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAtoken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    getDashData,
    dashData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;