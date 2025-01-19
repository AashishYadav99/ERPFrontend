import axios from "axios";
import React, { useState } from "react";
import constantApi from "../../constantApi";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import Pagination from "../Pagination";

const User_Management = () => {
  const [loader, setLoader] = useState(false);
  const [popoverId, setPopoverId] = useState(null);

  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const [headerInfo, setHeaderInfo] = useState({
    first_name: "",
    last_name: "",
    country_code: "",
    phone_number: "",
    email: "",
    rows: [
      {
        country: "",
        organization: "",
        location: "",
        role: "",
        // selected: false,
      },
    ],
  });

  // Dropdown options
  const countryOptions = ["Country 1", "Country 2"];
  const organizationOptions = ["Organization 1", "Organization 2"];
  const locationOptions = ["Location 1", "Location 2"];
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

  const handleHeaderChange = (field, value) => {
    setHeaderInfo({ ...headerInfo, [field]: value });
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...headerInfo.rows];
    updatedRows[index][field] = value;
    setHeaderInfo({ ...headerInfo, rows: updatedRows });
  };

  const addRow = () => {
    setHeaderInfo({
      ...headerInfo,
      rows: [
        ...headerInfo.rows,
        {
          country: "",
          organization: "",
          location: "",
          role: "",
          // selected: false,
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", headerInfo);

    setLoader(true);

    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/user_management/create`,
        headerInfo
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
          <h1 className="text-xl font-semibold text-gray-700">
            User management
          </h1>
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
        <div className="mb-6 bg-white p-4 rounded shadow">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={headerInfo.first_name}
              onChange={(e) => handleHeaderChange("first_name", e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={headerInfo.last_name}
              onChange={(e) => handleHeaderChange("last_name", e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Country Code"
              value={headerInfo.country_code}
              onChange={(e) =>
                handleHeaderChange("country_code", e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="phone_number Number"
              value={headerInfo.phone_number}
              onChange={(e) =>
                handleHeaderChange("phone_number", e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={headerInfo.email}
              onChange={(e) => handleHeaderChange("email", e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        </div>

        {/* role Section */}
        {headerInfo.rows.map((row, index) => (
          <div
            key={index}
            className="flex items-center gap-4 mb-4 bg-white p-4 rounded shadow"
          >
            <select
              className="border border-gray-300 p-2 rounded w-1/5"
              value={row.country}
              onChange={(e) =>
                handleRowChange(index, "country", e.target.value)
              }
            >
              <option value="" disabled>
                Select Country
              </option>
              {countryOptions.map((country, i) => (
                <option key={i} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              className="border border-gray-300 p-2 rounded w-1/5"
              value={row.organization}
              onChange={(e) =>
                handleRowChange(index, "organization", e.target.value)
              }
            >
              <option value="" disabled>
                Select Organization
              </option>
              {organizationOptions.map((org, i) => (
                <option key={i} value={org}>
                  {org}
                </option>
              ))}
            </select>

            <select
              className="border border-gray-300 p-2 rounded w-1/5"
              value={row.location}
              onChange={(e) =>
                handleRowChange(index, "location", e.target.value)
              }
            >
              <option value="" disabled>
                Select Location
              </option>
              {locationOptions.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <select
              className="border border-gray-300 p-2 rounded w-1/5"
              value={row.role}
              onChange={(e) => handleRowChange(index, "role", e.target.value)}
            >
              <option value="" disabled>
                Select Role
              </option>
              {roles.map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <input
              type="radio"
              className="w-5 h-5"
              checked={row.selected}
              onChange={() => handleRowChange(index, "selected", !row.selected)}
            />
          </div>
        ))}

        {/* Buttons Section */}
        <div className="flex gap-4">
          <button
            onClick={addRow}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add More
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default User_Management;
