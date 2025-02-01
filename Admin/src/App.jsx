

// import React, { useContext } from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import DocDashboard from "./doctor/DocDashboard";
// import { AdminContext } from "./context/AdminContext";
// import { DoctorContext } from "./context/DoctorContext";
// import DoctorList from "./pages/DoctorList";
// import AddDoctor from "./pages/AddDoctor";
// import AllAppointments from "./pages/AllAppointments";
// import Interface from "./pages/Interface";
// import DocProfile from "./doctor/DocProfile";
// import DocAppointment from "./doctor/DocAppointment";

// function App() {
//   const { aToken } = useContext(AdminContext);
//   const { dToken } = useContext(DoctorContext);

//   return (
//     <Routes>
//       <Route path="/" element={aToken || dToken ? <Navigate to={aToken ? "/dashboard" : "/doc-dashboard"} /> : <Login />} />
//       <Route path="/dashboard" element={aToken ? <Dashboard /> : <Navigate to="/" />}>
//         <Route path="all-appointments" element={<AllAppointments />} />
//         <Route path="add-doctor" element={<AddDoctor />} />
//         <Route path="doctors-list" element={<DoctorList />} />
//         <Route path="interface" element={<Interface />} />
//       </Route>
//       <Route path="/doc-dashboard" element={dToken ? <DocDashboard /> : <Navigate to="/" />}>
//         <Route path="profile" element={<DocProfile />} />
//         <Route path="appointments" element={<DocAppointment />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;



import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DocDashboard from "./doctor/DocDashboard";
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import DoctorList from "./pages/DoctorList";
import AddDoctor from "./pages/AddDoctor";
import AllAppointments from "./pages/AllAppointments";
import Interface from "./pages/Interface";
import DocProfile from "./doctor/DocProfile";
import DocAppointment from "./doctor/DocAppointment";
import DocDash from "./doctor/DocDash";

function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <Routes>
      <Route path="/" element={aToken || dToken ? <Navigate to={aToken ? "/dashboard" : "/doc-dashboard"} /> : <Login />} />
      <Route path="/dashboard" element={aToken ? <Dashboard /> : <Navigate to="/" />}>
        <Route path="all-appointments" element={<AllAppointments />} />
        <Route path="add-doctor" element={<AddDoctor />} />
        <Route path="doctors-list" element={<DoctorList />} />
        <Route path="interface" element={<Interface />} />
      </Route>
      <Route path="/doc-dashboard" element={dToken ? <DocDashboard /> : <Navigate to="/" />}>
        <Route path="profile" element={<DocProfile />} />
        <Route path="docDash" element={<DocDash />} />
        <Route path="appointments" element={<DocAppointment />} />
      </Route>
    </Routes>
  );
}

export default App;