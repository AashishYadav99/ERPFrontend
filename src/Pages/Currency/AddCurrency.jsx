import React, { useState } from "react";
import axios from "axios";
import constantApi from "../../constantApi";
function AddCurrency() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/currency/store`,
        { name }
      );
      console.log("response is ", response);

      setName(""); // Reset the input
    } catch (error) {
      setMessage(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Currency</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Currency Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCurrency;
