import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate()
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (state === "Sign Up") {
  //       const { data } = await axios.post(`${backendUrl}/api/user/register`, {
  //         name,
  //         password,
  //         email,
  //       });
  //       if (data.success) {
  //         localStorage.setItem("token", data.token);
  //         setToken(data.token);
  //         toast.success("Account created successfully!");
  //       } else {
  //         toast.error(data.message);
  //       }
  //     } else {
  //       const { data } = await axios.post(`${backendUrl}/api/user/userLogin`, {
  //         password,
  //         email,
  //       });
  //       if (data.success) {
  //         localStorage.setItem("token", data.token);
  //         setToken(data.token);
  //         toast.success("Login successful!");
  //       } else {
  //         toast.error(data.message);
  //       }
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || error.message);
  //   }
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { state, email, name, password });
    try {
      if (state === "Sign Up") {
        // Sign Up API call
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,   // Include name for Sign Up
          email,  // Include email for Sign Up
          password, // Include password for Sign Up
        });
        console.log("Sign Up Response:", data);
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        // Login API call
        const { data } = await axios.post(`${backendUrl}/api/user/userLogin`, {
          email,   // Include email for Login
          password, // Include password for Login
        });
        console.log("Login Response:", data);
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error occurred:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token, navigate])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <h3 className="text-md text-gray-600 mb-6 text-center">
          Please {state === "Sign Up" ? "create an account" : "login"} to book
          an appointment
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {state === "Sign Up" && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter username"
                required={state === "Sign Up"}
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {state === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary hover:underline font-medium cursor-pointer"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-primary hover:underline font-medium cursor-pointer"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;
