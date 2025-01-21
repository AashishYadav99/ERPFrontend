import axios from "axios";
import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import constantApi from "../../constantApi";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline, MdSettings } from "react-icons/md";
import { AiOutlineDoubleRight, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function Company() {
  const [companies, setCompanies] = useState([]);
  const [popoverId, setPopoverId] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios
      .post(`${constantApi.baseUrl}/company/list`, {
        page: 1,
        limit: 10,
      })
      .then((res) => {
        // console.log("response---", res);

        setCompanies(res.data.data.records);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
      });
  }, []);

  const handleActivity = (id) => setPopoverId(popoverId === id ? null : id);

  // const filteredCompanies = companies.filter((company) =>
  //   company.ccompany.toLowerCase().includes(searchInput.toLowerCase())
  // );

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <AiOutlineDoubleRight
            className="text-gray-600 text-xl cursor-pointer"
            onClick={() => navigate(-1)}
            title="Back"
          />
          <MdSettings className="text-blue-600 text-3xl" />
          <h1 className="text-xl font-semibold text-gray-700">Company</h1>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-64 px-3 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by Name"
          />
          <Link to="/add_company">
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-gray-700 bg-gray-100">
            <tr>
              <th className="p-4">Organisation</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.length > 0 ? (
              companies.map((company) => (
                <tr key={company.id} className="border-b">
                  <td className="p-4">{company.ccompany}</td>
                  <td className="p-4">{company.compdesc}</td>
                  <td className="p-4">
                    {company.status === 1 ? "Active" : "Inactive"}
                  </td>
                  <td className="p-4 flex gap-2 leading-tight">
                    <BiSolidEdit
                      className="text-blue-600 cursor-pointer hover:text-blue-800"
                      onClick={() => handleEditActivity(data.module_id)}
                      title="Edit"
                    />
                    <MdDeleteOutline
                      className="text-red-600 cursor-pointer hover:text-red-800"
                      onClick={() => deleteModule(data.module_id)}
                      title="Delete"
                    />
                    <AiOutlineEye
                      className="text-green-600 cursor-pointer hover:text-green-800"
                      onClick={() => handleViewActivity(data.module_id)}
                      title="View"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No companies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Company;
