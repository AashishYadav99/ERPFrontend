import React, { useState } from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const CompanyLocation = ({ locations = [{}], setFormData }) => {
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedLocation = [...prev.locations];
      updatedLocation[index] = {
        ...updatedLocation[index],
        [name]: value,
      };

      return {
        ...prev,
        locations: updatedLocation,
      };
    });
  };

  const addLocation = () => {
    setFormData((prev) => ({
      ...prev,
      locations: [...prev.locations, {}], // Add a new address object to the array
    }));
  };

  const removeRow = (index) => {
    setFormData((prev) => {
      const updatedLocations = prev.locations.filter((_, i) => i !== index);
      return { ...prev, locations: updatedLocations };
    });
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6  ">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Add locations</h2>
        <div className="overflow-x-auto max-w-full sm:max-w-lg md:max-w-5xl lg:max-w-5xl xl:max-w-5xl custom-scrollbar">
          <div className="flex flex-wrap gap-4 min-w-[1000px] ">
            {/* Render each row */}
            {locations.map((row, index) => (
              <div
                key={index}
                className="flex space-x-4 mb-4"
                // style={{ minWidth: "800px" }}
                style={{ minWidth: "1200px" }}
              >
                {/* Name */}
                <div className="flex-1 min-w-[100px]">
                  <label className="block text-sm font-medium text-gray-700">
                    Branch Name
                  </label>
                  <input
                    name="branch_name"
                    value={row.branch_name}
                    onChange={(e) => handleChange(index, e)}
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Branch Name"
                  />
                </div>

                {/* Address */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    name="address"
                    value={row.address}
                    onChange={(e) => handleChange(index, e)}
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Address"
                  />
                </div>
                {/* Currency */}
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-sm font-medium mb-1">
                    Currency
                  </label>
                  <input
                    type="text"
                    name="currency_id"
                    value={row.currency_id}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Currency"
                  />
                </div>

                {/* Remove Button */}
                <div className="flex-1 min-w-[50px]">
                  <button
                    onClick={() => removeRow(index)}
                    className="mt-6 text-red-600 hover:underline"
                  >
                    {/* Remove */}
                    <IoMdRemoveCircleOutline className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add More Details Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={addLocation}
            className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
          >
            Add More Location
          </button>
        </div>
      </div>
    </>
  );
};

export default CompanyLocation;
