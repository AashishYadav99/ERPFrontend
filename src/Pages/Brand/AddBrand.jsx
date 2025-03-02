import { useState } from "react";
import axios from "axios";
import constantApi from "../../constantApi";

const AddBrand = () => {
  const [formData, setFormData] = useState({
    brandcode: "",
    brandname: "",
    brandlong: "",
    note1: "",
    note2: "",
    note3: "",
    itmsbranddt1: "",
    itmsbranddt2: "",
    status: "",
    addedby: "",
    createddt: new Date().toLocaleString(),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${constantApi.baseUrl}/brand/store`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Brand added successfully!");
      //   setFormData({
      //     brandcode: "",
      //     brandname: "",
      //     brandlong: "",
      //     note1: "",
      //     note2: "",
      //     note3: "",
      //     itmsbranddt1: "",
      //     itmsbranddt2: "",
      //     status: "",
      //     addedby: "",
      //     createddt: new Date().toLocaleString(),

      //   });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Add New Brand
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              {key.replace(/_/g, " ").toUpperCase()}
            </label>
            <input
              type={key.includes("date") ? "date" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
        ))}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBrand;
