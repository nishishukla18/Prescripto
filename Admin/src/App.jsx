import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AdminContext } from "./context/AdminContext";
import DoctorList from "./pages/DoctorList";
import AddDoctor from "./pages/AddDoctor";
import AllAppointments from "./pages/AllAppointments";

function App() {
  const { aToken } = useContext(AdminContext);

  return (
    <Routes>
      <Route path="/" element={aToken ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={aToken ? <Dashboard /> : <Navigate to="/" />}>
        <Route path="all-appointments" element={<AllAppointments />} />
        <Route path="add-doctor" element={<AddDoctor />} />
        <Route path="doctors-list" element={<DoctorList />} />
      </Route>
    </Routes>
  );
}

export default App;
