import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';

function AddDoctor() {
  const [docImg, setDocImg] = useState(null);
  const [docName, setDocName] = useState("");
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [degree, setDegree] = useState('');
  const [address, setAddress] = useState('');

  const { aToken, backendUrl } = useContext(AdminContext);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "doc-img") {
      setDocImg(files[0]);
    } else {
      switch(name) {
        case "docName":
          setDocName(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "phone":
          setPhone(value);
          break;
        case "password":
          setPassword(value);
          break;
        case "experience":
          setExperience(value);
          break;
        case "fees":
          setFees(value);
          break;
        case "about":
          setAbout(value);
          break;
        case "speciality":
          setSpeciality(value);
          break;
        case "degree":
          setDegree(value);
          break;
        case "address":
          setAddress(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('image', docImg);
    form.append('name', docName);
    form.append('email', email);
    form.append('password', password);
    form.append('experience', experience);
    form.append('fees', fees);
    form.append('about', about);
    form.append('speciality', speciality);
    form.append('degree', degree);
    form.append('address', address);

    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, form, {
        headers: { aToken }
      });

      if (data.success) {
        alert('Doctor added successfully!');
        setDocImg(null);
        setDocName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setExperience('');
        setFees('');
        setAbout('');
        setSpeciality('');
        setDegree('');
        setAddress('');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <form
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md"
      onSubmit={handleSubmit}
    >
      <p className="text-2xl font-semibold text-center mb-6">Add Doctor</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload area"
              className="w-20 h-20 object-cover"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            name="doc-img"
            hidden
            onChange={handleChange}
          />
          <p className="text-sm text-gray-500 mt-2">Upload Doctor Picture</p>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Doctor Name</label>
          <input
            type="text"
            name="docName"
            value={docName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Doctor Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Doctor Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Experience</label>
          <select
            name="experience"
            value={experience}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Experience</option>
            <option value="1 Year">Less than 1 year</option>
            <option value="2 Years">More than 1 year</option>
            <option value="5 Years">More than 5 years</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Fees</label>
          <input
            type="number"
            name="fees"
            value={fees}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Fees"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Speciality</label>
          <select
            name="speciality"
            value={speciality}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Speciality</option>
            <option value="General Physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Education</label>
          <input
            type="text"
            name="degree"
            value={degree}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Education"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Address"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">About Me</label>
          <textarea
            name="about"
            value={about}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Write about yourself"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition"
      >
        Add Doctor
      </button>
    </form>
  );
}

export default AddDoctor;
