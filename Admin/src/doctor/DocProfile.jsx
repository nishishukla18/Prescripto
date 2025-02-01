import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function DocProfile() {
  const { profileData, getProfileData, setProfileData, dToken } = useContext(DoctorContext);
  const { backendUrl } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      };

      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {
        headers: { dtoken: dToken }
      });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the profile");
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg mt-10 shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Doctor Profile</h1>
      <div className="flex flex-col ">
      <div className=" justify-center items-center">
        <img 
          src={profileData.image} 
          alt="Doctor Profile" 
          className="w-32 h-32 border-2 border-gray-300 mb-4 object-cover bg-blue-300"
          style={{ aspectRatio: '1 / 1' }}
        />
        </div>
        <p className="text-lg font-semibold text-gray-700">Name: <span className="font-normal">{profileData.name}</span></p>
        <p className="text-lg font-semibold text-gray-700">Email: <span className="font-normal">{profileData.email}</span></p>
        <p className="text-lg font-semibold text-gray-700">Degree: <span className="font-normal">{profileData.degree}</span></p>
        <p className="text-lg font-semibold text-gray-700">Speciality: <span className="font-normal">{profileData.speciality}</span></p>
        <p className="text-lg font-semibold text-gray-700">About: <span className="font-normal">{profileData.about}</span></p>
        <p className="text-lg font-semibold text-gray-700">Fees: <span className="font-normal">{isEdit ? <input type='number' value={profileData.fees} onChange={(e) => setProfileData({ ...profileData, fees: e.target.value })} className="border rounded px-2 py-1" /> : `$${profileData.fees}`}</span></p>
        <p className="text-lg font-semibold text-gray-700">Address: <span className="font-normal">{profileData.address}</span></p>
        <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <input 
            type='checkbox' 
            checked={profileData.available} 
            onChange={(e) => setProfileData({ ...profileData, available: e.target.checked })} 
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          Available: <span className={`font-normal ${profileData.available ? 'text-green-600' : 'text-red-600'}`}>{profileData.available ? 'Yes' : 'No'}</span>
        </label>
        <div className="flex gap-4 mt-5">
          {isEdit && (
            <button 
              onClick={updateProfile} 
              className='px-4 py-1 border border-green-500 text-sm rounded-full hover:bg-green-500 hover:text-white transition-all'>
              Save
            </button>
          )}
          <button 
            onClick={() => setIsEdit(!isEdit)} 
            className='px-4 py-1 border border-blue-500 text-sm rounded-full hover:bg-blue-500 hover:text-white transition-all'>
            {isEdit ? 'Cancel' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocProfile;