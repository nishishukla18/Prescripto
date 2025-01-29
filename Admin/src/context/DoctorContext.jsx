import { createContext, useState, useEffect } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const [dToken, setDtoken] = useState(localStorage.getItem("dToken") || "");

  useEffect(() => {
    if (dToken) {
      localStorage.setItem("dToken", dToken);
    } else if (localStorage.getItem("dToken")) {
      localStorage.removeItem("dToken");
    }
  }, [dToken]);

  const value = {
    dToken,
    setDtoken,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;