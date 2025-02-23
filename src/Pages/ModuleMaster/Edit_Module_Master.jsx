import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import constantApi from "../../constantApi";

function Edit_Module_Master() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [editForm, setEditForm] = useState({
    module_name: "",
    module_description: "",
    status: 1,
    note1: "",
    note2: "",
    sorting_order: "",
    date1: "",
    date2: "",
  });

  const [editId, setEditId] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (state && state.module) {
      const module = state.module;
      setEditId(module.module_id);
      setEditForm({
        module_name: module.module_name,
        module_description: module.module_description,
        status: module.status,
        note1: module.note1,
        note2: module.note2,
        sorting_order: module.sorting_order,
        date1: module.date1,
        date2: module.date2,
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
      .put(`${constantApi.baseUrl}/module_master/${editId}`, editForm)
      .then((res) => {
        setLoader(false);
        alert("User Management updated successfully");
        navigate("/user_management");
        // Redirect or update state as needed
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error updating module: ", err);
        alert("Failed to update the module.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Edit Module Master
        </h1>
        <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-6">
          {/* Module Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Module Name</label>
            <input
              type="text"
              name="module_name"
              value={editForm.module_name}
              onChange={handleEditChange}
              placeholder="Enter Module Name"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Module Description */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Module Description</label>
            <textarea
              name="module_description"
              value={editForm.module_description}
              onChange={handleEditChange}
              placeholder="Enter Module Description"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Note 1 */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Note 1</label>
            <input
              type="text"
              name="note1"
              value={editForm.note1}
              onChange={handleEditChange}
              placeholder="Enter Note 1"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Note 2 */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Note 2</label>
            <input
              type="text"
              name="note2"
              value={editForm.note2}
              onChange={handleEditChange}
              placeholder="Enter Note 2"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Sorting Order */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Sorting Order</label>
            <input
              type="number"
              name="sorting_order"
              value={editForm.sorting_order}
              onChange={handleEditChange}
              placeholder="Enter Sorting Order"
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

          {/* Date 1 */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Date 1</label>
            <input
              type="datetime-local"
              name="date1"
              value={editForm.date1}
              onChange={handleEditChange}
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Date 2 */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Date 2</label>
            <input
              type="datetime-local"
              name="date2"
              value={editForm.date2}
              onChange={handleEditChange}
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

export default Edit_Module_Master;
