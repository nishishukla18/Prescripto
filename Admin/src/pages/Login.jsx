// import React, { useState, useContext, useEffect } from "react";
// import { AdminContext } from "../context/AdminContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [state, setState] = useState("Admin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { aToken, setAtoken, backendUrl } = useContext(AdminContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (aToken) {
//       navigate("/dashboard"); // Redirect if already authenticated
//     }
//   }, [aToken, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
//         email,
//         password,
//       });

//       if (data.success) {
//         localStorage.setItem("aToken", data.token);
//         setAtoken(data.token);
//         alert("Login successful!");
//         navigate("/dashboard"); // Redirect to dashboard
//       } else {
//         alert(data.message || "Login failed!");
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "An error occurred!");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           <span className="text-blue-600">{state}</span> Login
//         </h2>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//         >
//           Login
//         </button>
//         <p className="mt-4 text-sm text-center text-gray-600">
//           {state === "Admin" ? (
//             <span>
//               Doctor Login?{" "}
//               <span
//                 className="text-blue-600 cursor-pointer"
//                 onClick={() => setState("Doctor")}
//               >
//                 Click Here
//               </span>
//             </span>
//           ) : (
//             <span>
//               Admin Login?{" "}
//               <span
//                 className="text-blue-600 cursor-pointer"
//                 onClick={() => setState("Admin")}
//               >
//                 Click Here
//               </span>
//             </span>
//           )}
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { aToken, setAtoken, backendUrl } = useContext(AdminContext);
  const { dToken, setDtoken } = useContext(DoctorContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      navigate("/dashboard"); // Redirect if already authenticated
    }
  }, [aToken, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = state === "Admin" ? "admin/login" : "doctor/login";
      const { data } = await axios.post(`${backendUrl}/api/${endpoint}`, {
        email,
        password,
      });

      if (data.success) {
        if (state === "Admin") {
          localStorage.setItem("aToken", data.token);
          setAtoken(data.token);
        } else {
          localStorage.setItem("dToken", data.token);
          setDtoken(data.token);
        }
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          <span className="text-blue-600">{state}</span> Login
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          {state === "Admin" ? (
            <span>
              Doctor Login?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Doctor")}
              >
                Click Here
              </span>
            </span>
          ) : (
            <span>
              Admin Login?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Admin")}
              >
                Click Here
              </span>
            </span>
          )}
        </p>
      </form>
    </div>
  );
}

export default Login;