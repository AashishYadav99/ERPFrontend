import axios from "axios";
import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";

import constantApi from "../../constantApi";
import { useNavigate } from "react-router-dom";

function Add_Function_Master() {
  const [loader, setLoader] = useState(false);

  const [moduleMaster, setModuleMaster] = useState([]);
  const [functionMaster, setFunctionMaster] = useState([]);
  const [subModuleMaster, setSubModuleMaster] = useState([]);
  const [filteredSubModules, setFilteredSubModules] = useState([]);
  const [actionOptions, setActionOptions] = useState([
    { value: 1, label: "Add" },
    { value: 2, label: "Edit" },
    { value: 3, label: "View" },
  ]); // Default options for multiselect
  const [selectedActions, setSelectedActions] = useState([
    { value: 1, label: "Add" },
    { value: 2, label: "Edit" },
  ]); // Pre-selected default options

  const [moduleId, setModuleId] = useState();
  const navigate = useNavigate();

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

  const [formData, setFormData] = useState({
    module_id: "",
    sub_module_id: "",
    function_master_name: "",
    function_master_description: "",
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
    e.preventDefault();
    setLoader(true);

    console.log("Form Data Submitted:", formData);
    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/function_master/create`,
        formData
      );
      console.log("response is ", response);

      alert("Function Master Added Successfully");
      setLoader(false);
      navigate("/function_master");
    } catch (err) {
      console.error("Error is ", err);
      setLoader(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/module_master/list`)
      .then((res) => {
        setModuleMaster(res.data.data);
      })
      .catch((err) => {
        console.error("Error is ", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/sub_module_master/list`)
      .then((res) => {
        setSubModuleMaster(res.data.data);
      })
      .catch((err) => {
        console.error("Error is ", err);
      });
  }, []);

  const handleSelect = (id) => {
    setModuleId(id);
    setFormData({
      ...formData,
      function_master_id: id,
    });
    const filtered = subModuleMaster.filter(
      (subModule) => subModule.module_id === Number(id)
    );
    setFilteredSubModules(filtered);
  };


  const handleActionChange = async (selectedActions) => {
    setSelectedActions(selectedActions);
  
    // Check for new actions that aren't in the actionOptions list
    const newActions = selectedActions.filter(
      (action) => !actionOptions.some((opt) => opt.value === action.value)
    );
  
    for (const newAction of newActions) {
      try {
        // Search if the action exists in the database
        const searchResponse = await axios.get(
          `${constantApi.baseUrl}/action_master/search?name=${newAction.label}`
        );
  
        if (searchResponse.data && searchResponse.data.exists) {
          // If it exists, add it to actionOptions
          const existingAction = searchResponse.data.action;
          setActionOptions((prev) => [
            ...prev,
            { value: existingAction.action_id, label: existingAction.action_name },
          ]);
        } else {
          // If it doesn't exist, insert it into the database
          const createResponse = await axios.post(
            `${constantApi.baseUrl}/action_master/create`,
            { action_name: newAction.label }
          );
  
          const createdAction = createResponse.data.action;
          setActionOptions((prev) => [
            ...prev,
            { value: createdAction.action_id, label: createdAction.action_name },
          ]);
  
          // Update selected actions with the new action
          setSelectedActions((prev) => [
            ...prev.filter((action) => action.value !== newAction.value),
            { value: createdAction.action_id, label: createdAction.action_name },
          ]);
        }
      } catch (error) {
        console.error("Error handling new action:", error);
      }
    }
  };  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Add Function Master
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Module ID */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Select Module </label>
            <select
              onChange={(e) => {
                const selectedModuleId = e.target.value;
                setFormData({
                  ...formData,
                  module_id: selectedModuleId,
                  sub_module_id: "",
                });
                const filtered = subModuleMaster.filter(
                  (subModule) =>
                    subModule.module_id === Number(selectedModuleId)
                );
                console.log(selectedModuleId);
                setFilteredSubModules(filtered);
              }}
              name="module_id"
              id="module_id"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 sm:text-sm"
            >
              <option value="">Select Module</option>
              {moduleMaster.map((moduleData) => (
                <option key={moduleData.module_id} value={moduleData.module_id}>
                  {moduleData.module_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Select Sub Module </label>
            <select
              onChange={(e) =>
                setFormData({ ...formData, sub_module_id: e.target.value })
              }
              name="sub_module_id"
              id="sub_module_id"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 sm:text-sm"
            >
              <option value="">Select Sub Module</option>
              {filteredSubModules.map((subModuleData) => (
                <option
                  key={subModuleData.sub_module_id}
                  value={subModuleData.sub_module_id}
                >
                  {subModuleData.sub_module_name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Module Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Function Master Name</label>
            <input
              type="text"
              name="function_master_name"
              value={formData.function_master_name}
              onChange={handleChange}
              placeholder="Enter Sub Module Name"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Sub Module Description */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">
              Function Master Description
            </label>
            <textarea
              name="function_master_description"
              value={formData.function_master_description}
              onChange={handleChange}
              placeholder="Enter Sub Module Description"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Function Multiselect */}
          <div className="flex flex-col col-span-2">
            <label className="text-gray-600 mb-2">Select Actions</label>
            <CreatableSelect
                options={actionOptions}
                isMulti
                value={selectedActions}
                onChange={handleActionChange}
                placeholder="Search or type to add actions..."
                className="basic-multi-select"
                classNamePrefix="select"
                createOptionPosition="first"
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

export default Add_Function_Master;
