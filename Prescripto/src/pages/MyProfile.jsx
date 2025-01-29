// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// function MyProfile() {
//   const { userData, setUserData, token, backendUrl, getUserData } = useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(false); // Start in edit mode as false
//   const [updatedUserData, setUpdatedUserData] = useState({
//     name: userData?.name || "",
//     phone: userData?.phone || "",
//     address: userData?.address || "",
//     gender: userData?.gender || "",
//     dob: userData?.dob || "",
//   });
//   const [image, setImage] = useState(null);

//   // Update user data and send it to the backend
//   const updateUserProfile = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", updatedUserData.name);
//       formData.append("phone", updatedUserData.phone);
//       formData.append("address", updatedUserData.address);
//       formData.append("gender", updatedUserData.gender);
//       formData.append("dob", updatedUserData.dob);

//       // Append the new image if it's changed
//       if (image) {
//         formData.append("image", image);
//       }

//       const { data } = await axios.post(`${backendUrl}/api/user/updateProfile`, formData, {
//         headers: { token },
//       });

//       if (data.success) {
//         toast.success(data.message);
//         await getUserData(); // Re-fetch the updated user data
//         setIsEdit(false); // Switch back to view mode
//         setImage(null); // Reset image selection
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("An error occurred while updating your profile.");
//     }
//   };

//   // Handle input change for fields
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedUserData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="p-4 my-8 border rounded-lg max-w-md mx-auto bg-gray-50">
//       {/* Profile Image */}
//       <div className="flex flex-col items-center">
//         {isEdit ? (
//           <label htmlFor="image">
//             <div>
//               <img
//                 src={image ? URL.createObjectURL(image) : userData?.image}
//                 alt="Profile"
//                 className="rounded-full w-24 h-24 mb-4 border"
//               />
//               <img src={assets.upload_icon} alt="Upload" />
//             </div>
//             <input
//               type="file"
//               id="image"
//               hidden
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </label>
//         ) : (
//           <img
//             src={userData?.image || "default-profile.png"}
//             alt="Profile"
//             className="rounded-full w-24 h-24 mb-4 border"
//           />
//         )}
//         <h2 className="text-xl font-bold">{userData?.name || "N/A"}</h2>
//       </div>

//       <hr className="my-4" />

//       {/* Contact Information */}
//       <div>
//         <p className="font-semibold text-gray-700">Contact Information</p>
//         {isEdit ? (
//           <input
//             type="text"
//             name="name"
//             value={updatedUserData.name}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded mt-2"
//           />
//         ) : (
//           <p>{userData?.email || "N/A"}</p>
//         )}
//         <p>Phone: {isEdit ? <input type="text" name="phone" value={updatedUserData.phone} onChange={handleInputChange} /> : userData?.phone || "N/A"}</p>
//       </div>

//       <hr className="my-4" />

//       {/* Address */}
//       <div>
//         <p className="font-semibold text-gray-700">Address</p>
//         {isEdit ? (
//           <input
//             type="text"
//             name="address"
//             value={updatedUserData.address}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded mt-2"
//           />
//         ) : (
//           <p>{userData?.address || "Address not available"}</p>
//         )}
//       </div>

//       <hr className="my-4" />

//       {/* Additional Info */}
//       <div>
//         <p className="font-semibold text-gray-700">Additional Information</p>
//         {isEdit ? (
//           <>
//             <input
//               type="text"
//               name="gender"
//               value={updatedUserData.gender}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded mt-2"
//             />
//             <input
//               type="date"
//               name="dob"
//               value={updatedUserData.dob}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded mt-2"
//             />
//           </>
//         ) : (
//           <>
//             <p>Gender: {userData?.gender || "N/A"}</p>
//             <p>Date of Birth: {userData?.dob || "N/A"}</p>
//           </>
//         )}
//       </div>

//       <hr className="my-4" />

//       {/* Buttons to toggle edit mode and save */}
//       {isEdit ? (
//         <button onClick={updateUserProfile} className="bg-primary text-white p-2 rounded mt-4">Save</button>
//       ) : (
//         <button onClick={() => setIsEdit(true)} className="bg-blue-500 text-white p-2 rounded mt-4">Edit</button>
//       )}
//     </div>
//   );
// }

// export default MyProfile;


import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function MyProfile() {
  const { userData, setUserData, token, backendUrl, getUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false); // Start in edit mode as false
  const [updatedUserData, setUpdatedUserData] = useState({
    name: userData?.name || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
    gender: userData?.gender || "",
    dob: userData?.dob || "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (userData) {
      setUpdatedUserData({
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        gender: userData.gender,
        dob: userData.dob,
      });
    }
  }, [userData]);

  // Update user data and send it to the backend
  const updateUserProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", updatedUserData.name);
      formData.append("phone", updatedUserData.phone);
      formData.append("address", updatedUserData.address);
      formData.append("gender", updatedUserData.gender);
      formData.append("dob", updatedUserData.dob);

      // Append the new image if it's changed
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(`${backendUrl}/api/user/updateProfile`, formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await getUserData(); // Re-fetch the updated user data
        setIsEdit(false); // Switch back to view mode
        setImage(null); // Reset image selection
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating your profile.");
    }
  };

  // Handle input change for fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 my-8 border rounded-lg max-w-md mx-auto bg-gray-50">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        {isEdit ? (
          <label htmlFor="image">
            <div>
              <img
                src={image ? URL.createObjectURL(image) : userData?.image}
                alt="Profile"
                className="rounded-full w-24 h-24 mb-4 border"
              />
              <img src={assets.upload_icon} alt="Upload" />
            </div>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            src={userData?.image || "default-profile.png"}
            alt="Profile"
            className="rounded-full w-24 h-24 mb-4 border"
          />
        )}
        <h2 className="text-xl font-bold">{userData?.name || "N/A"}</h2>
      </div>

      <hr className="my-4" />

      {/* Contact Information */}
      <div>
        <p className="font-semibold text-gray-700">Contact Information</p>
        {isEdit ? (
          <input
            type="text"
            name="name"
            value={updatedUserData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mt-2"
          />
        ) : (
          <p>{userData?.email || "N/A"}</p>
        )}
        <p>Phone: {isEdit ? <input type="text" name="phone" value={updatedUserData.phone} onChange={handleInputChange} /> : userData?.phone || "N/A"}</p>
      </div>

      <hr className="my-4" />

      {/* Address */}
      <div>
        <p className="font-semibold text-gray-700">Address</p>
        {isEdit ? (
          <input
            type="text"
            name="address"
            value={updatedUserData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mt-2"
          />
        ) : (
          <p>{userData?.address || "Address not available"}</p>
        )}
      </div>

      <hr className="my-4" />

      {/* Additional Info */}
      <div>
        <p className="font-semibold text-gray-700">Additional Information</p>
        {isEdit ? (
          <>
            <input
              type="text"
              name="gender"
              value={updatedUserData.gender}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-2"
            />
            <input
              type="date"
              name="dob"
              value={updatedUserData.dob}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-2"
            />
          </>
        ) : (
          <>
            <p>Gender: {userData?.gender || "N/A"}</p>
            <p>Date of Birth: {userData?.dob || "N/A"}</p>
          </>
        )}
      </div>

      <hr className="my-4" />

      {/* Buttons to toggle edit mode and save */}
      {isEdit ? (
        <button onClick={updateUserProfile} className="bg-primary text-white p-2 rounded mt-4">Save</button>
      ) : (
        <button onClick={() => setIsEdit(true)} className="bg-blue-500 text-white p-2 rounded mt-4">Edit</button>
      )}
    </div>
  );
}

export default MyProfile;