import React, { useState, useEffect } from "react";
import axios from "axios";
import constantApi from "../../constantApi";
import countryData from "../../countrycode";

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
    language_id: "",
    birth_date: "",
    country_id: 1,
    orgnisation: "",
    location: "",
    gender: "",
    role_id: 1,
  });

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/role_master/list`)
      .then((res) => setRoleMaster(res.data.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  console.log("rolemaster ", roleMaster);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("formData", formData);

    setLoader(true);

    e.preventDefault();
    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/register`,
        formData
      );
      console.log("respone is --", response);
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
        <form onSubmit={handleSubmit} className="">
          {/* Module Name */}
          <div className=" grid grid-cols-2 gap-4">
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
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>
          <div className=" grid grid-cols-4 gap-4 items-center my-4">
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
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Language ID
              </label>
              <input
                type="text"
                name="language_id"
                placeholder="Language ID"
                value={formData.language_id}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div className=" grid grid-cols-3 gap-4 items-center my-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Phone Code
              </label>
              <input
                type="text"
                name="phonecode"
                placeholder="Phone Code"
                value={formData.phonecode}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
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
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4 items-start w-full">
            {/* Country */}
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Country
              </label>
              <select
                id="country"
                name="country_id"
                value={formData.country_id}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              >
                <option value="" disabled>
                  Choose a country
                </option>
                {countryData.map((country, index) => (
                  <option key={index} value={country.calling_code}>
                    {country.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Organization */}
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Organization
              </label>
              <input
                type="text"
                name="orgnisation"
                placeholder="Organization"
                value={formData.orgnisation}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
              />
            </div>

            {/* Location */}
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
              />
            </div>

            {/* Role */}
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Role
              </label>
              <select
                id="role_id"
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              >
                <option value="" disabled>
                  Choose a role
                </option>
                {roleMaster.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-600 flex items-center"
              disabled={loader}
            >
              {loader ? (
                <div className="loader inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              ) : null}
              Register
            </button>
          </div>
        </form>
        {/* <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
        >
          Register
        </button> */}
      </div>
    </div>
  );
};

export default UserRegisterPage;
