// Country.js (Component to display list of countries)

import React, { useEffect, useState } from "react";
import axios from "axios";
import constantApi from "../../constantApi";

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.post(
          `${constantApi.baseUrl}/country/list`
        );
        console.log("====================================");
        console.log("res", response);
        setCountries(response.data.data.records);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries", error);
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Country List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.id}>
              <td>{country.id}</td>
              <td>{country.name}</td>
              <td>
                <button onClick={() => handleEdit(country.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Country;
