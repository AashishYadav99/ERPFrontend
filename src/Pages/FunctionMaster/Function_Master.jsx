import React, { useState, useEffect } from "react";
import { MdSettings } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import constantApi from "../../constantApi";
import Pagination from "../Pagination";

const Function_Master = () => {
  const [functionMaster, setFunctionMaster] = useState([]);
  const [popoverId, setPopoverId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/function_master/list`)
      .then((res) => setFunctionMaster(res.data.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleActivity = (id) => setPopoverId(popoverId === id ? null : id);
  const handleEditActivity = (id) => {
    const functionDetail = functionMaster.find((data) => data.function_master_id === id);
    navigate("/edit_function_master", { state: { functionDetail } });
  };
  const handleViewActivity = (id) => {
    const module = functionMaster.find((data) => data.function_master_id === id);
    navigate("/view_function_master", { state: { module } });
  };
  const deleteModule = (id) => {
    axios
      .delete(`${constantApi.baseUrl}/function_master/${id}`)
      .then(() => setFunctionMaster((prev) => prev.filter((data) => data.function_master_id !== id)))
      .catch((err) => alert("Failed to delete the module."));
  };

  const filteredModules = functionMaster.filter((data) =>
    data.function_master_id.toString().includes(searchInput)
  );

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <AiOutlineDoubleRight
            className="text-gray-600 text-xl cursor-pointer"
            onClick={() => navigate(-1)}
            title="Back"
          />
          <MdSettings className="text-blue-600 text-3xl" />
          <h1 className="text-xl font-semibold text-gray-700">Function Master</h1>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-64 px-3 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by ID"
          />
          <Link to="/add_function_master">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              + New
            </button>
          </Link>
          <div className="relative">
            <GiHamburgerMenu
              className="text-gray-700 text-2xl cursor-pointer hover:text-gray-900"
              onClick={() => setPopoverId((prev) => !prev)}
            />
            {popoverId && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md border border-gray-200 z-10">
                <ul>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Import Order</li>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Export Orders</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md p-4">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-gray-700 bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredModules.map((data) => (
              <tr key={data.function_master_id} className="border-b">
                <td className="p-4 leading-tight">{data.function_master_name}</td>
                <td className="p-4 leading-tight">{data.function_master_description}</td>
                <td className="p-4 leading-tight">{data.status === 1 ? "Active" : "Inactive"}</td>
                <td className="p-4 flex gap-2 leading-tight">
                  <BiSolidEdit
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => handleEditActivity(data.function_master_id)}
                    title="Edit"
                  />
                  <MdDeleteOutline
                    className="text-red-600 cursor-pointer hover:text-red-800"
                    onClick={() => deleteModule(data.function_master_id)}
                    title="Delete"
                  />
                  <AiOutlineEye
                    className="text-green-600 cursor-pointer hover:text-green-800"
                    onClick={() => handleViewActivity(data.function_master_id)}
                    title="View"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
};

export default Function_Master;
