import { createContext, useState, useEffect } from "react";
import axios from 'axios'
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAtoken] = useState(localStorage.getItem("aToken") || "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const[doctors,setDoctors] = useState([])
  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
    } else if (localStorage.getItem("aToken")) {
      localStorage.removeItem("aToken");
    }
  }, [aToken]);

const getAllDoctors = async()=>{
  try {
    const {data} = await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}})
    if(data.success){
      setDoctors(data.doctors)
      console.log(data.doctors)
    }
    else{
      alert(data.message)
    }
  } catch (error) {
    alert(error.message)
  }
}
const changeAvailability = async(docId)=>{
  try {
    const {data} = await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}})
    if(data.success){
      alert(data.message)
      getAllDoctors()
    }
    else{
      alert(data.message)
    }
  } catch (error) {
    alert(error.message)
  }
}
  const value = {
    aToken,
    setAtoken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability
    
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
