import React, { useState } from "react";
import axios from "axios";
import constantApi from "../../constantApi";

const UserRegisterPage = () => {
  const [formData, setFormData] = useState({
    role: "",
    register_type: "",
    email: "",
    password: "",
    phonecode: "",
    mobile: "",
    language_id: "",
    fcmToken: "",
    device_type: "",
    firstname: "",
    lastname: "",
    birth_date: "",
    currency_id: "",
    gender: "",
    country_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/register`,
        formData
      );
      console.log("respone is --", response);

      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error.response.data);
      alert("Failed to register user.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="register_type"
        placeholder="Register Type"
        value={formData.register_type}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phonecode"
        placeholder="Phone Code"
        value={formData.phonecode}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="mobile"
        placeholder="mobile"
        value={formData.mobile}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="language_id"
        placeholder="Language ID"
        value={formData.language_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="fcmToken"
        placeholder="FCM Token"
        value={formData.fcmToken}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="device_type"
        placeholder="Device Type"
        value={formData.device_type}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={formData.firstname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={formData.lastname}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="birth_date"
        placeholder="Birth Date"
        value={formData.birth_date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="currency_id"
        placeholder="Currency ID"
        value={formData.currency_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={formData.gender}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="country_type"
        placeholder="Country Type"
        value={formData.country_type}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default UserRegisterPage;
