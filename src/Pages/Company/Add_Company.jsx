import React, { useState } from "react";
import axios from "axios";
import constantApi from "../../constantApi";
import { useNavigate } from "react-router-dom";

const Add_Company = () => {
  const [formData, setFormData] = useState({
    compdesc: "",
    // clogo: "",
    ccountry: "",
    compcode: "",

    itemdesclong: "",
    note1: "",
    note2: "",
    note3: "",
    ccompany: "",
    ccurrency: "",
    clicense: "",
    ctaxnumber: "",
    itmcatdt1: "",
    itmcatdt2: "",
    status: 1,
    addedby: 1,
    banks: [],
    address: [],
  });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  const navigation = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert status to numeric values (1 for active, 0 for inactive)
    if (name === "status") {
      setFormData({
        ...formData,
        [name]: value === "active" ? 1 : value === "inactive" ? 0 : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, clogo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/company/store`,
        formData
      );
      alert("Company added successfully!");
      navigation("/company");
      console.log(response.data);
    } catch (error) {
      alert("Error adding company. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Add Company</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            type="text"
            name="ccompany"
            value={formData.ccompany}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Company Description
          </label>
          <input
            type="text"
            name="compdesc"
            value={formData.compdesc}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            name="ccountry"
            value={formData.ccountry}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company Code</label>
          <input
            type="text"
            name="compcode"
            value={formData.compcode}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <input
            type="number"
            name="ccurrency"
            value={formData.ccurrency}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">License</label>
          <input
            type="text"
            name="clicense"
            value={formData.clicense}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Number</label>
          <input
            type="text"
            name="ctaxnumber"
            value={formData.ctaxnumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Date 1 (itmcatdt1)
          </label>
          <input
            type="date"
            name="itmcatdt1"
            value={formData.itmcatdt1}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Date 2 (itmcatdt2)
          </label>
          <input
            type="date"
            name="itmcatdt2"
            value={formData.itmcatdt2}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Company
        </button>
      </form>
    </div>
  );
};

export default Add_Company;
