import axios from "axios";
import React, { useState } from "react";
import constantApi from "../../constantApi";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import Pagination from "../Pagination";

const roles = [
  "System Administrator",
  "Superuser",
  "Business Administrator",
  "Finance Manager",
  "HR Manager",
  "Warehouse Manager",
  "Procurement Manager",
  "Sales Manager",
  "Production Manager",
  "Quality Control Manager",
  "Supply Chain Manager",
  "Project Manager",
  "End Users",
  "Reports User",
  "Security Administrator",
];

const User_Management = () => {
  const [loader, setLoader] = useState(false);
  const [popoverId, setPopoverId] = useState(null);

  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country_code: "",
    phone_number: "",
    location: "",
    organisation: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/user_management/create`,
        formData
      );
      alert("User Added Successfully");
      setLoader(false);
      navigate("/user_management");
    } catch (err) {
      console.error("Error:", err);
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <AiOutlineDoubleRight
            className="text-gray-600 text-xl cursor-pointer"
            onClick={() => navigate(-1)}
            title="Back"
          />
          <MdSettings className="text-blue-600 text-3xl" />
          <h1 className="text-xl font-semibold text-gray-700">Module Master</h1>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-64 px-3 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by Name"
          />
          <Link to="/add_module_master">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              + New
            </button>
          </Link>
          <div className="relative">
            <GiHamburgerMenu
              className="text-gray-700 text-2xl cursor-pointer hover:text-gray-900"
              onClick={() => setPopoverId((prev) => !prev)}
            />
            {popoverId && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md border border-gray-200 z-10">
                <ul>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Import
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Export
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          User Management Form
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter First Name"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter Last Name"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Country Code */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Country Code
            </label>
            <input
              type="text"
              name="country_code"
              value={formData.country_code}
              onChange={handleChange}
              placeholder="Enter Country Code"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter Location"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Organisation */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Organisation
            </label>
            <input
              type="text"
              name="organisation"
              value={formData.organisation}
              onChange={handleChange}
              placeholder="Enter Organisation"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              {loader ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User_Management;
