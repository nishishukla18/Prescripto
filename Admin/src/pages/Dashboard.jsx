import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink, Outlet } from "react-router-dom";
import { assets } from "../assets/assets";

function Dashboard() {
  const { setAtoken } = useContext(AdminContext);

  const handleLogout = () => {
    localStorage.removeItem("aToken");
    setAtoken("");
    alert("Logged out successfully!");
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-white text-black flex flex-col space-y-4 p-4">
        <div className="flex items-center space-x-4">
          <img
            src={assets.admin_logo}
            alt="Admin Logo"
            className="h-16 object-contain"
          />
          <h1 className="text-lg font-semibold text-black">
            Admin Dashboard
          </h1>
        </div>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="all-appointments"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500"
                }`
              }
            >
              <img src={assets.appointment_icon} alt="Appointments Icon" className="w-6 h-6" />
              <p>Appointments</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="add-doctor"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500"
                }`
              }
            >
              <img src={assets.add_icon} alt="Add Doctor Icon" className="w-6 h-6" />
              <p>Add Doctor</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="doctors-list"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500"
                }`
              }
            >
              <img src={assets.people_icon} alt="Doctors List Icon" className="w-6 h-6" />
              <p>Doctors List</p>
            </NavLink>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex-grow flex flex-col bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
        </nav>

        <div className="p-4">
          <Outlet />
        </div>

        <footer className="bg-white py-4 shadow-inner">
          <div className="container mx-auto text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Dashboard. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
