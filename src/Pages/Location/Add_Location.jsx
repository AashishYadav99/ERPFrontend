import React, { useState, useEffect } from "react";
import constantApi from "../../constantApi";
import axios from "axios";

function Add_Location() {
  const [companies, setCompanies] = useState([]);
  const [addedby, setAddedBy] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [locations, setLocations] = useState([""]);

  useEffect(() => {
    axios
      .post(`${constantApi.baseUrl}/company/list`, {
        page: 1,
        limit: 10,
      })
      .then((res) => {
        console.log("response---", res);

        // Assuming each record has an `id` and `ccompany` (name) property
        const result = res.data.data.records.map((item) => ({
          id: item.id,
          name: item.ccompany,
        }));

        setCompanies(result);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
      });
  }, []);

  // Handle input changes for locations
  const handleLocationChange = (index, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = value;
    setLocations(updatedLocations);
  };

  // Add new location field
  const addLocationField = () => {
    setLocations([...locations, ""]);
  };

  // Remove location field
  const removeLocationField = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Join the locations array into a comma-separated string
    const locnames = locations.join(", "); // Join array elements into a string

    const payload = {
      addedby,
      ccompany: selectedCompany,
      locname: locnames, // Sending the locations as a single string
    };

    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/location/store`,
        payload
      );
      alert("Location added successfully!");
      console.log("Response:", response.data);
      // Redirect or do other actions as needed
    } catch (error) {
      alert("Error adding location. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add Company Location</h1>
      <form onSubmit={handleSubmit}>
        {/* Added By */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Added By</label>
          <input
            type="text"
            value={addedby}
            onChange={(e) => setAddedBy(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Company Name Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="" disabled>
              Select a company
            </option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {/* Locations */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Locations</label>
          {locations.map((locname, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={locname}
                onChange={(e) => handleLocationChange(index, e.target.value)}
                className="w-full border rounded p-2"
                placeholder={`Location ${index + 1}`}
                required
              />
              {locations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLocationField(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addLocationField}
            className="mt-2 text-blue-500"
          >
            + Add Location
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Add_Location;
