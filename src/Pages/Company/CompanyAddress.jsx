import React from "react";
import countryData from "../../countrycode";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const CompanyAddress = ({ address = [{}], setFormData }) => {
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedAddress = [...prev.address];
      updatedAddress[index] = {
        ...updatedAddress[index],
        [name]: value,
      };

      return {
        ...prev,
        address: updatedAddress,
      };
    });
  };

  const addAddress = () => {
    setFormData((prev) => ({
      ...prev,
      address: [...prev.address, {}], // Add a new address object to the array
    }));
  };

  const removeRow = (index) => {
    setFormData((prev) => {
      const updatedAddress = prev.address.filter((_, i) => i !== index);
      return { ...prev, address: updatedAddress };
    });
  };

  return (
    <div className="p-4 border rounded mb-4 bg-white">
      <h2 className="text-lg font-bold mb-4">CompanyAddress </h2>
      <div className="overflow-x-auto max-w-full sm:max-w-lg md:max-w-5xl lg:max-w-5xl xl:max-w-5xl custom-scrollbar">
        <div className="flex flex-wrap gap-4 min-w-[1000px] ">
          {" "}
          {/* Set min-width for scroll */}
          {address.map((addr, index) => (
            <div
              key={index}
              className="flex gap-4 mb-4 w-full"
              style={{ minWidth: "1200px" }}
            >
              {" "}
              {/* Make each form take full width */}
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium mb-1">
                  Company Address (Entry {index + 1})
                </label>
                <input
                  type="text"
                  name="address_name"
                  value={addr.address_name || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Company Address "
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={addr.address || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Address"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postal_code"
                  value={addr.postal_code || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Postal Code"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>
                <select
                  name="country_id"
                  value={addr.country_id}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(index, e)} // Pass index explicitly
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="">Select a country</option>
                  {countryData.map(({ country, calling_code }) => (
                    <option key={calling_code} value={calling_code}>
                      {country} (+{calling_code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium mb-1">
                  Contact No
                </label>
                <input
                  type="text"
                  name="contact_no"
                  value={addr.contact_no || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Contact No"
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
      <button
        type="button"
        onClick={addAddress}
        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
      >
        Add More Address
      </button>
    </div>
  );
};

export default CompanyAddress;
