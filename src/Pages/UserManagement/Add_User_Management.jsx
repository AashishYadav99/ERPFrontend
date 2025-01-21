import axios from "axios";
import React, { useState } from "react";
import constantApi from "../../constantApi";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa"; // Blue plus icon and trash

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
        role_id: "", // Changed from role to role_id
        selected: false,
      },
    ],
  });

  // Dropdown options
  const countryOptions = ["Country 1", "Country 2"];
  const organizationOptions = ["Organization 1", "Organization 2"];
  const locationOptions = ["Location 1", "Location 2"];

  const roles = [
    { value: 1, label: "System Administrator" },
    { value: 2, label: "Superuser" },
    { value: 3, label: "Business Administrator" },
    { value: 4, label: "Finance Manager" },
    { value: 5, label: "HR Manager" },
    { value: 6, label: "Warehouse Manager" },
    { value: 7, label: "Procurement Manager" },
    { value: 8, label: "Sales Manager" },
    { value: 9, label: "Production Manager" },
    { value: 10, label: "Quality Control Manager" },
    { value: 11, label: "Supply Chain Manager" },
    { value: 12, label: "Project Manager" },
    { value: 13, label: "End Users" },
    { value: 14, label: "Reports User" },
    { value: 15, label: "Security Administrator" },
  ];

  const handleHeaderChange = (field, value) => {
    setHeaderInfo({ ...headerInfo, [field]: value });
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...headerInfo.rows];
    updatedRows[index][field] = value;
  
    if (field === "selected" && value) {
      updatedRows.forEach((row, i) => {
        if (i !== index) {
          row.selected = false; // Deselect other rows
        }
      });
    }
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
          role_id: "", // Ensure role_id is initialized
          selected: false,
        },
      ],
    });
  };

  const deleteRow = (index) => {
    const updatedRows = headerInfo.rows.filter((_, i) => i !== index);
    setHeaderInfo({ ...headerInfo, rows: updatedRows });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that each row has a selected role_id
    const invalidRows = headerInfo.rows.filter((row) => !row.role_id); // Changed to role_id
    if (invalidRows.length > 0) {
      alert("Please select a role for each entry.");
      return; // Prevent submission if there's a missing role
    }

    console.log("Form Data Sent to Server:", headerInfo);

    setLoader(true);

    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/user_management/create`,
        headerInfo // Ensure we send role_id here
      );
      console.log("Response from Server:", response.data);
      alert("User Added Successfully");
      setLoader(false);
      navigate("/user_management");
    } catch (err) {
      console.error("Error in API call:", err.response ? err.response.data : err);
      setLoader(false);
      alert("Something went wrong! Please try again.");
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
          <h1 className="text-xl font-semibold text-gray-700">User Management</h1>
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

          {/* Country Code and Phone Number Below First Name */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Country Code"
                value={headerInfo.country_code}
                onChange={(e) =>
                  handleHeaderChange("country_code", e.target.value)
                }
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Phone Number"
                value={headerInfo.phone_number}
                onChange={(e) =>
                  handleHeaderChange("phone_number", e.target.value)
                }
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
          </div>

          {/* Email Below Last Name */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Email"
                value={headerInfo.email}
                onChange={(e) => handleHeaderChange("email", e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
          </div>
        </div>

        {headerInfo.rows.map((row, index) => (
          <div
            key={index}
            className="flex items-center gap-2 mb-2 bg-white p-2 rounded shadow-sm" // Reduced padding for compact row
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
              value={row.role_id} // Updated to role_id
              onChange={(e) =>
                handleRowChange(index, "role_id", e.target.value) // Handle role_id change
              }
            >
              <option value="" disabled>
                Select Role
              </option>
              {roles.map((role, i) => (
                <option key={i} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>

            <input
              type="radio"
              className="w-4 h-4" // Smaller radio button
              checked={row.selected}
              onChange={() => handleRowChange(index, "selected", !row.selected)}
            />

            {/* Delete button (except on the last row) */}
            {index !== headerInfo.rows.length - 1 && (
              <FaTrashAlt
                className="text-red-500 text-xl cursor-pointer"
                onClick={() => deleteRow(index)}
                title="Delete Row"
              />
            )}

            {/* Plus icon button for adding row, only show it on the last row */}
            {index === headerInfo.rows.length - 1 && (
              <FaPlusCircle
                className="text-blue-500 text-2xl cursor-pointer"
                onClick={addRow}
                title="Add Row"
              />
            )}
          </div>
        ))}

        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            disabled={loader}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            {loader ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default User_Management;
