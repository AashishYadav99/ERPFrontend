import axios from "axios";
import React, { useState, useEffect } from "react";
import constantApi from "../../constantApi";
import { useNavigate } from "react-router-dom";

function SubModuleMasterForm() {
  const [loader, setLoader] = useState(false);

  const [moduleMaster, setModuleMaster] = useState([]);
  const [moduleId, setModuleId] = useState();
  const navigate = useNavigate();

  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const [formData, setFormData] = useState({
    module_id: "",
    sub_module_name: "",
    sub_module_description: "",
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
        `${constantApi.baseUrl}/sub_module_master/create`,
        formData
      );
      alert("Sub Module Master Added");
      setLoader(false);
      navigate("/sub_module_master");
      console.log("response is from sub module master ", response);
    } catch (err) {
      console.error("Error is ", err);
    }
  };

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/module_master/list`)
      .then((res) => {
        console.log(
          "response is from module master in add submodule master ",
          res
        );
        setModuleMaster(res.data.data);
      })
      .catch((err) => {
        console.error("Error is ", err);
      });
  }, []);

  const handleSelect = (id) => {
    setModuleId(id);
    setFormData({
      ...formData,
      module_id: id,
    });
  };

  console.log("module id is ", moduleId);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Sub Module Master Form
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Module ID */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Select Module </label>
            <select
              onChange={(e) => handleSelect(e.target.value)}
              name="module_id"
              id="module_id"
              // className=" py-2 border-gray-100  "
              class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 sm:text-sm"
            >
              {/* Default option */}
              <option value="">Select Module Master ID</option>
              {moduleMaster.map((moduleData) => (
                <option
                  onClick={() => handleSelect(moduleData.module_id)}
                  value={moduleData.module_id}
                  className=" border-gray-100"
                >
                  {moduleData.module_name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Module Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Sub Module Name</label>
            <input
              type="text"
              name="sub_module_name"
              value={formData.sub_module_name}
              onChange={handleChange}
              placeholder="Enter Sub Module Name"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Sub Module Description */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Sub Module Description</label>
            <textarea
              name="sub_module_description"
              value={formData.sub_module_description}
              onChange={handleChange}
              placeholder="Enter Sub Module Description"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* note 1  */}
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

          {/* note 2 */}
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

export default SubModuleMasterForm;
