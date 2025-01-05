import axios from "axios";
import React, { useState } from "react";
import constantApi from "../../constantApi";
import { useNavigate } from "react-router-dom";

function Add_Module_Master() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " "); // "YYYY-MM-DD HH:MM:SS"

  console.log("formattedDate", formattedDate);

  const [formData, setFormData] = useState({
    module_name: "",
    module_description: "",
    note1: "",
    note2: "",
    sorting_order: "",
    status: "1",
    created_at: formattedDate,
    date1: "",
    date2: "",
    created_by: 1,
    updated_by: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/module_master/create`,
        formData
      );
      alert("Module Master Added");
      setLoader(false);
      navigate("/module_master");
      console.log("Response is from module master:", response);
    } catch (err) {
      setLoader(false);
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
            <label className="text-gray-600 mb-2">Note 1</label>
            <input
              type="text"
              name="note1"
              value={formData.note1}
              onChange={handleChange}
              placeholder="Enter Note 1"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Updated By */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Note 2</label>
            <input
              type="text"
              name="note2"
              value={formData.note2}
              onChange={handleChange}
              placeholder="Enter  note 2"
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

          {/* Date 1 */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Date 1</label>
            <input
              type="datetime-local"
              name="date1"
              value={formData.date1}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
          {/* Date 2 */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Date 2</label>
            <input
              type="datetime-local"
              name="date2"
              value={formData.date2}
              onChange={handleChange}
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
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add_Module_Master;