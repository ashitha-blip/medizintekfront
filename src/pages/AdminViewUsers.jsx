import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/allAPIS";

function AdminViewUsers() {
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const result = await getAllUsers();
      if (result.status === 200) {
        setAllUsers(result.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        User List
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full table-auto border-collapse bg-white">
          {/* Table Header */}
          <thead className="bg-gray-800 text-white uppercase text-sm leading-normal sticky top-0">
            <tr>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Address</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-700 text-sm font-light">
            {allUsers.length > 0 ? (
              allUsers.map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-300"
                >
                  <td className="py-3 px-6">{user.username}</td>
                  <td className="py-3 px-6">{user.phoneNumber || "N/A"}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.address || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminViewUsers;
