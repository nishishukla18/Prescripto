// import { createContext } from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [doctors, setDoctors] = useState([]);
//   const [token, setToken] = useState(localStorage.getItem("token") || false);
//   const [userData, setUserData] = useState(false);

//   const getDoctorsData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
//       if (data.success) {
//         setDoctors(data.doctors);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//       toast.error("Failed to fetch doctors.");
//     }
//   };

//   const getUserData = async () => {
//     if (!token) return;

//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/getProfile`, {
//         headers: { token },
//       });

//       if (data.success) {
//         setUserData(data.user);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       toast.error("Failed to fetch user data.");
//     }
//   };

//   useEffect(() => {
//     getDoctorsData();
//   }, []);

//   useEffect(() => {
//     if (token) {
//       getUserData();
//     } else {
//       setUserData(false);
//     }
//   }, [token]);

//   const value = {
//     doctors,
//     getDoctorsData,
//     token,
//     setToken,
//     backendUrl,
//     userData,
//     setUserData,
//     getUserData,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export default AppContextProvider;


import { createContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to fetch doctors.");
    }
  };

  const getUserData = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/getProfile`, {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setUserData(null);
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;