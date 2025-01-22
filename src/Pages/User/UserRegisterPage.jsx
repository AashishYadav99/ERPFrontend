import React, { useState, useEffect } from "react";
import axios from "axios";
import constantApi from "../../constantApi";
import countryData from "../../countrycode";
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa';

const UserRegisterPage = () => {
  const [roleMaster, setRoleMaster] = useState([]);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonecode: "",
    mobile: "",
    language_id: "",  // Will be updated with integer value
    birth_date: "",
    country_id: 1,
    orgnisation: "",  // Will be updated with integer value
    location: "",  // Will be updated with integer value
    gender: "",  // Will be updated with integer value
    role_id: 1,  // Will be updated with integer value
  });

  const [headerInfo, setHeaderInfo] = useState({
    rows: [{}] // Remove the initial row with pre-filled values
  });

  // Update countryOptions for select
  const countryOptions = countryData.map((country) => ({
    value: country.calling_code,
    label: `${country.country} (+${country.calling_code})`
  }));

  // Updated organizationOptions with integer values
  const organizationOptions = [
    { value: 1, label: 'Org A' },
    { value: 2, label: 'Org B' },
    { value: 3, label: 'Org C' }
  ];

  // Updated locationOptions with integer values
  const locationOptions = [
    { value: 1, label: 'New York' },
    { value: 2, label: 'Toronto' },
    { value: 3, label: 'London' }
  ];

  // Updated languageOptions with integer values
  const languageOptions = [
    { value: 1, label: 'English' },
    { value: 2, label: 'Spanish' },
    { value: 3, label: 'French' },
    { value: 4, label: 'German' }
  ];

  // Updated genderOptions with integer values
  const genderOptions = [
    { value: 1, label: 'Male' },
    { value: 2, label: 'Female' },
    { value: 3, label: 'Other' }
  ];

  // Fetching role data dynamically and mapping to integer values
  const roles = roleMaster.map(role => ({
    value: role.role_id,  // Assuming role_id is an integer
    label: role.role_name
  }));

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...headerInfo.rows];

    // If the field is 'selected', unselect other radios and select the current one
    if (field === 'selected') {
      updatedRows.forEach((row, i) => {
        // Unselect all other rows
        row.selected = i === index ? value : false;
      });
    } else {
      updatedRows[index][field] = value;
    }

    setHeaderInfo({ rows: updatedRows });
  };

  const addRow = () => {
    setHeaderInfo({ rows: [...headerInfo.rows, { country: '', organization: '', location: '', role_id: '' }] });
  };

  const deleteRow = (index) => {
    const updatedRows = headerInfo.rows.filter((_, i) => i !== index);
    setHeaderInfo({ rows: updatedRows });
  };

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/role_master/list`)
      .then((res) => setRoleMaster(res.data.data))
      .catch((err) => console.error("Error fetching data:", err));

    // Set the first row's radio button as selected by default
    setHeaderInfo(prev => {
      if (prev.rows.length > 0) {
        const updatedRows = [...prev.rows];
        updatedRows[0].selected = true;  // Set first row's radio button as selected by default
        return { rows: updatedRows };
      }
      return prev;
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only parse integers for fields that expect numbers (e.g., role_id, mobile, etc.)
    if (name === "role_id" || name === "mobile" || name === "phonecode" || name === "location" || name === "organization") {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value }); // Keep other fields as strings
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    // Consolidate form data and dynamic row data
    const submissionData = {
      ...formData,  // Basic user details
      roles: headerInfo.rows.map(row => ({
        country: row.country,
        organization: row.organization,
        location: row.location,
        role_id: row.role_id
      }))
    };
    console.log("submissionData", submissionData);

    try {
      const response = await axios.post(`${constantApi.baseUrl}/register`, submissionData);
      console.log("response:", response);
      setLoader(false);
      alert("User registered successfully!");
    } catch (error) {
      setLoader(false);
      console.error("Error registering user:", error.response.data);
      alert("Failed to register user.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Register</h1>
        <form onSubmit={handleSubmit}>
          {/* User Details */}
          <div className="grid grid-cols-4 gap-6 items-center my-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="" disabled>Select Gender</option>
                {genderOptions.map((gender, i) => (
                  <option key={i} value={gender.value}>{gender.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Phone and Birth Date */}
          <div className="grid grid-cols-4 gap-6 items-center my-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Mobile Code
              </label>
              <select
                name="phonecode"
                value={formData.phonecode}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="" disabled>Select Mobile Code</option>
                {countryOptions.map((country, i) => (
                  <option key={i} value={country.value}>{country.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Birth Date
              </label>
              <input
                type="date"
                name="birth_date"
                placeholder="Birth Date"
                value={formData.birth_date}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Dynamically added rows for country, organization, location, and role */}
          {headerInfo.rows.map((row, index) => (
            <div key={index} className="flex items-center gap-2 mb-3 bg-white p-2 rounded-lg shadow-sm">
              <select
                className="border border-gray-300 p-2 rounded-md w-1/5 text-sm"
                value={row.country}
                onChange={(e) => handleRowChange(index, 'country', parseInt(e.target.value))}
              >
                <option value="" disabled>Select Country</option>
                {countryOptions.map((country, i) => (
                  <option key={i} value={country.value}>{country.label}</option>
                ))}
              </select>

              <select
                className="border border-gray-300 p-2 rounded-md w-1/5 text-sm"
                value={row.organization}
                onChange={(e) => handleRowChange(index, 'organization', parseInt(e.target.value))}
              >
                <option value="" disabled>Select Organization</option>
                {organizationOptions.map((org, i) => (
                  <option key={i} value={org.value}>{org.label}</option>
                ))}
              </select>

              <select
                className="border border-gray-300 p-2 rounded-md w-1/5 text-sm"
                value={row.location}
                onChange={(e) => handleRowChange(index, 'location', parseInt(e.target.value))}
              >
                <option value="" disabled>Select Location</option>
                {locationOptions.map((loc, i) => (
                  <option key={i} value={loc.value}>{loc.label}</option>
                ))}
              </select>

              <select
                className="border border-gray-300 p-2 rounded-md w-1/5 text-sm"
                value={row.role_id}
                onChange={(e) => handleRowChange(index, 'role_id', parseInt(e.target.value))}
              >
                <option value="" disabled>Select Role</option>
                {roles.map((role, i) => (
                  <option key={i} value={role.value}>{role.label}</option>
                ))}
              </select>

              <input
                type="radio"
                className="w-3 h-3"
                checked={row.selected || false}  // Default to false if not set
                onChange={() => handleRowChange(index, 'selected', !row.selected)}
              />

              {index !== headerInfo.rows.length - 1 && (
                <FaTrashAlt
                  className="text-grey-300 text-xs cursor-pointer"
                  onClick={() => deleteRow(index)}
                  title="Delete Row"
                />
              )}

              {index === headerInfo.rows.length - 1 && (
                <FaPlusCircle
                  className="text-blue-500 text-2xl cursor-pointer"
                  onClick={addRow}
                  title="Add Row"
                />
              )}
            </div>
          ))}

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm hover:bg-blue-700 flex items-center transition-all"
              disabled={loader}
            >
              {loader ? (
                <div className="loader inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              ) : null}
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegisterPage;
