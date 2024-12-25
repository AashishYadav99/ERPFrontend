import React, { useState } from "react";
import axios from "axios";

function Ashish() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the data to the API
      const response = await axios.post(
        "http://localhost:6600/api/ashish/create",
        {
          name,
          age,
          mobileNumber,
        }
      );

      setMessage(response.data.message); // Set the success message
    } catch (error) {
      console.error("There was an error!", error);
      setMessage("Error submitting data");
    }
  };

  return (
    <div className="App">
      <h1>Create Ashish Yadav Record</h1>

      {message && <p>{message}</p>}

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

        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Ashish;
