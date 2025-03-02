// AddCountry.js (Component to add a country)

import React, { useState } from "react";
import axios from "axios";

const Add_Country = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/countries/store", { name });
      if (response.data.success) {
        alert("Country added successfully");
      }
    } catch (error) {
      setError("Failed to add country");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Add New Country</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Country"}
        </button>
      </form>
    </div>
  );
};

export default Add_Country;
