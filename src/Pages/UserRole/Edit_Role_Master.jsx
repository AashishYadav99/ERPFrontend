import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import constantApi from "../../constantApi";

function Edit_Role_Master() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [editForm, setEditForm] = useState({
    role_name: "",
    role_description: "",
  });

  const [editId, setEditId] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (state && state.role) {
      const role = state.role;
      setEditId(role.role_id);
      setEditForm({
        role_name: role.role_name,
        role_description: role.role_description,
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
      .put(`${constantApi.baseUrl}/role_master/${editId}`, editForm)
      .then((res) => {
        setLoader(false);
        alert("Role Master updated successfully");
        navigate("/role_master");
        // Redirect or update state as needed
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error updating role: ", err);
        alert("Failed to update the role.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Edit role Master
        </h1>
        <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-6">
          {/* role Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">role Name</label>
            <input
              type="text"
              name="role_name"
              value={editForm.role_name}
              onChange={handleEditChange}
              placeholder="Enter role Name"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* role Description */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">role Description</label>
            <textarea
              name="role_description"
              value={editForm.role_description}
              onChange={handleEditChange}
              placeholder="Enter role Description"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
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

export default Edit_Role_Master;
