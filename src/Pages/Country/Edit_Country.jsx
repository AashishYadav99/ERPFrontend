// EditCountry.js (Component to edit a country)

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Edit_Country = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.post("/api/countries/details", { id });
        if (response.data.success) {
          setCountry(response.data.data);
          setName(response.data.data.name);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching country details", error);
      }
    };
    fetchCountryDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/countries/update", { id, name });
      if (response.data.success) {
        alert("Country updated successfully");
      }
    } catch (error) {
      alert("Failed to update country");
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Country</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Country"}
        </button>
      </form>
    </div>
  );
};

export default Edit_Country;
