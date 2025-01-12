import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import constantApi from "../../constantApi";
function Edit_User_Management() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    organisation: "",
    location: "",
    status: 1,
  });

  const [editId, setEditId] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (state && state.user_management) {
      const user = state.user_management;
      console.log("id is  ", user.id);

      setEditId(user.id);
      setEditForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        organisation: user.organisation,
        location: user.location,
        status: user.status,
      });
    }
  }, [state]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    axios
      .put(`${constantApi.baseUrl}/user_management/${editId}`, editForm)
      .then(() => {
        setLoader(false);
        alert("User updated successfully");
        navigate("/user_management");
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error updating user: ", err);
        alert("Failed to update the user.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Edit User Management
        </h1>
        <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">First Name</label>
            <input
              type="text"
              name="first_name"
              value={editForm.first_name}
              onChange={handleEditChange}
              placeholder="Enter First Name"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={editForm.last_name}
              onChange={handleEditChange}
              placeholder="Enter Last Name"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
              placeholder="Enter Email"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Phone</label>
            <input
              type="text"
              name="phone_number"
              value={editForm.phone_number}
              onChange={handleEditChange}
              placeholder="Enter Phone Number"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Organisation */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Organisation</label>
            <input
              type="text"
              name="organisation"
              value={editForm.organisation}
              onChange={handleEditChange}
              placeholder="Enter Organisation"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={editForm.location}
              onChange={handleEditChange}
              placeholder="Enter Location"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Status</label>
            <select
              name="status"
              value={editForm.status}
              onChange={handleEditChange}
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8 col-span-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 flex items-center"
              disabled={loader}
            >
              {loader ? (
                <div className="loader inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              ) : null}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit_User_Management;
