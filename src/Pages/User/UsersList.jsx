import React, { useState, useEffect } from "react";
import { AiOutlineDoubleRight, AiOutlineEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline, MdSettings } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../Pagination";
import constantApi from "../../constantApi";

const UsersList = () => {
  const [usersData, setUsersData] = useState([]);
  const [popoverId, setPopoverId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/list`)
      .then((res) => {
        console.log("response is ------", res);
        setUsersData(res.data.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleActivity = (id) => setPopoverId(popoverId === id ? null : id);
  //   const handleEditActivity = (id) => {
  //     const user_management = usersData.find((data) => data.id === id);
  //     navigate("/edit_user_management", { state: { user_management } });
  //   };
  //   const handleViewActivity = (id) => {
  //     const user_management = usersData.find((user) => user.id === id);
  //     navigate("/view_user_management", { state: { user_management } });
  //   };
  const deleteModule = (id) => {
    console.log("id is ", id);

    // axios
    //   .delete(`${constantApi.baseUrl}/${id}`)
    //   .then(() => setUsersData((prev) => prev.filter((data) => data.id !== id)))
    //   .catch((err) => alert("Failed to delete the module."));
  };

  //   const filteredModules = usersData.filter((data) =>
  //     data.first_name.toLowerCase().includes(searchInput.toLowerCase())
  //   );

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
          <h1 className="text-xl font-semibold text-gray-700">
            {" "}
            User Management
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-64 px-3 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by Name"
          />
          <Link to="/add_user_management">
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
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Import
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Export
                  </li>
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
              <th className="p-4">First Name</th>
              <th className="p-4">Last Name</th>
              <th className="p-4">Email Id</th>
              <th className="p-4">Phone No.</th>
              <th className="p-4">Role ID</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((data) => (
              <tr key={data.module_id} className="border-b">
                <td className="p-4 leading-tight">{data.firstname}</td>
                <td className="p-4 leading-tight">{data.lastname}</td>
                <td className="p-4 leading-tight">{data.email}</td>
                <td className="p-4 leading-tight">{data.mobile}</td>
                <td className="p-4 leading-tight">{data.role_id}</td>
                <td className="p-4 leading-tight">
                  {data.status === 1 ? "Active" : "Inactive"}
                </td>
                <td className="p-4 flex gap-2 leading-tight">
                  <BiSolidEdit
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                    // onClick={() => handleEditActivity(data.id)}
                    title="Edit"
                  />
                  <MdDeleteOutline
                    className="text-red-600 cursor-pointer hover:text-red-800"
                    onClick={() => deleteModule(data.id)}
                    title="Delete"
                  />
                  <AiOutlineEye
                    className="text-green-600 cursor-pointer hover:text-green-800"
                    // onClick={() => handleViewActivity(data.id)}
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

export default UsersList;
