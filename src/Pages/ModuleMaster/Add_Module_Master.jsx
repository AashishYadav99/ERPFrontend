import axios from "axios";
import React, { useState } from "react";
import constantApi from "../../constantApi";

function Add_Module_Master() {
  const [formData, setFormData] = useState({
    module_name: "",
    module_id: "",
    module_description: "",
    created_by: "",
    updated_by: "",
    sorting_order: "",
    status: "1",
    created_at: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/module_master/create`,
        formData
      );
      console.log("Response is from module master:", response);
    } catch (err) {
      console.error("Error is:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Add Module Master
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Module Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Module Name</label>
            <input
              type="text"
              name="module_name"
              value={formData.module_name}
              onChange={handleChange}
              placeholder="Enter Module Name"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Module ID */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Module ID</label>
            <input
              type="text"
              name="module_id"
              value={formData.module_id}
              onChange={handleChange}
              placeholder="Enter Module ID"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Module Description */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Module Description</label>
            <textarea
              name="module_description"
              value={formData.module_description}
              onChange={handleChange}
              placeholder="Enter Module Description"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Created By */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Created By</label>
            <input
              type="text"
              name="created_by"
              value={formData.created_by}
              onChange={handleChange}
              placeholder="Enter Creator ID"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Updated By */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Updated By</label>
            <input
              type="text"
              name="updated_by"
              value={formData.updated_by}
              onChange={handleChange}
              placeholder="Enter Updater ID"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Sorting Order */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Sorting Order</label>
            <input
              type="number"
              name="sorting_order"
              value={formData.sorting_order}
              onChange={handleChange}
              placeholder="Enter Sorting Order"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          {/* Created At */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Created At</label>
            <input
              type="datetime-local"
              name="created_at"
              value={formData.created_at}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add_Module_Master;
