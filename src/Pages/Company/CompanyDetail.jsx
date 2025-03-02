import React, { useEffect, useState } from "react";
import countryData from "../../countrycode";
import constantApi from "../../constantApi";
import axios from "axios";

const CompanyDetail = ({
  compdesc,
  ccountry,
  compcode,
  ccompany,
  ccurrency,
  clicense,
  ctaxnumber,
  itmcatdt1,
  itmcatdt2,
  setFormData,
  clogo,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios
      .post(`${constantApi.baseUrl}/currency/list`, {
        page: 1,
        limit: 10,
      })
      .then((res) => {
        console.log("response--- from currency", res.data.data);

        setCurrencies(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching currency:", err);
      });
  }, []);

  return (
    <div className="p-4 border rounded mb-4 bg-white">
      <h2 className="text-lg font-bold mb-4">Company Details</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Company Code */}
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            type="text"
            name="ccompany"
            value={ccompany}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        {/* Company Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Company Description
          </label>
          <input
            type="text"
            name="compdesc"
            value={compdesc}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        {/* Country */}
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <select
            name="ccountry"
            value={ccountry}
            onChange={handleChange}
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

        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>

          <select
            name="ccurrency"
            value={ccurrency}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select a Currency</option>
            {currencies.map((ccurrency, index) => (
              <option key={index} value={ccurrency.id}>
                {ccurrency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Currency */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <input
            type="text"
            name="ccurrency"
            value={ccurrency}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div> */}
        {/* License */}
        <div>
          <label className="block text-sm font-medium mb-1">License</label>
          <input
            type="text"
            name="clicense"
            value={clicense}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        {/* Tax Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Tax Number</label>
          <input
            type="text"
            name="ctaxnumber"
            value={ctaxnumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Company Name */}
        <div>
          {/* <label className="block text-sm font-medium mb-1">Company Code</label>
          <input
            type="text"
            name="compcode"
            value={compcode}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          /> */}

          <div>
            <label className="block text-sm font-medium mb-1">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Item Category 1 */}
        <div>
          <label className="block text-sm font-medium mb-1">Date 1</label>
          <input
            type="date"
            name="itmcatdt1"
            value={itmcatdt1}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        {/* Item Category 2 */}
        <div>
          <label className="block text-sm font-medium mb-1">Date 2</label>
          <input
            type="date"
            name="itmcatdt2"
            value={itmcatdt2}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
