import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../services/allAPIS";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit, FiShoppingBag, FiLogOut } from "react-icons/fi"; // Import icons

function Profile() {
  const { loggedUser, setLoggedUser,fetchUserDeatails } = useContext(UserContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (loggedUser) {
      setEditUser({
        username: loggedUser.username || "",
        email: loggedUser.email || "",
        phoneNumber: loggedUser.phoneNumber || "",
        address: loggedUser.address || "",
      });
    }
  }, [loggedUser]);

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized: Please log in.");
        return;
      }
      const reqHeader = { authorization: `Bearer ${token}` };
      
      const response = await editProfile(editUser, reqHeader);
      if (response.status === 200) {
        fetchUserDeatails()
                setIsModalOpen(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.warn(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong.");
    }
  };

  const logout=()=>{
    sessionStorage.clear();
    navigate('/')
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loggedUser ? (
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-gray-700">
              {loggedUser?.username?.charAt(0)}
            </div>
            <h2 className="mt-3 text-xl font-semibold">{loggedUser?.username}</h2>
            <p className="text-gray-500">{loggedUser?.email}</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <span className="text-gray-600 font-medium">Phone Number</span>
              <span className="text-gray-800">{loggedUser?.phoneNumber}</span>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <span className="text-gray-600 font-medium">Address</span>
              <span className="text-gray-800">{loggedUser?.address}</span>
            </div>
          </div>


<div className="mt-6 flex justify-center space-x-4">
  <button
    onClick={() => setIsModalOpen(true)}
    className="flex items-center justify-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
  >
    <FiEdit size={18} />
    Edit
  </button>

  <button
    onClick={() => navigate("/orders")}
    className="flex items-center justify-center gap-2 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md"
  >
    <FiShoppingBag size={18} />
    Orders
  </button>

  <button
    onClick={() => logout()}
    className="flex items-center justify-center gap-2 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
  >
    <FiLogOut size={18} />
    Logout
  </button>
</div>

        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="text-4xl font-medium text-gray-600 text-center">
            Please Login!!!
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-5 px-7 rounded-lg py-2 bg-gray-600 text-white"
          >
            Login
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <input type="text" name="username" value={editUser.username} onChange={handleChange} placeholder="Username" className="w-full p-2 border rounded mb-3" />
            <input type="email" name="email" value={editUser.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded mb-3" />
            <input type="text" name="phoneNumber" value={editUser.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded mb-3" />
            <input type="text" name="address" value={editUser.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded mb-3" />
            <div className="flex justify-between mt-4">
              <button onClick={handleUpdateProfile} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default Profile;
