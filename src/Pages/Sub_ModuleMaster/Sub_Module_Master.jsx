import React, { useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiMoreVertical } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { CiViewTable } from "react-icons/ci";

import axios from "axios"; // For API calls
import constantApi from "../../constantApi";
import Pagination from "../Pagination";

const Sub_Module_Masters = () => {
  const [subModuleMaster, setSubModuleMaster] = useState([]);
  const [popoverId, setPopoverId] = useState(null); // Track the currently open popover
  const popoverRefs = useRef({});
  const [searchInput, setSearchInput] = useState(""); // State for search input

  const navigate = useNavigate();

  // Fetch module IDs from the backend when the component mounts
  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/sub_module_master/list`)
      .then((res) => {
        setSubModuleMaster(res.data.data);
      })
      .catch((err) => {
        console.error("Error is ", err);
      });
  }, [subModuleMaster]);

  const handleActivity = (id) => {
    setPopoverId(popoverId === id ? null : id);
    console.log("id is ", id);
  };

  const handleEditActivity = (id) => {
    setPopoverId(popoverId === id ? null : id);
    console.log("id is from handleEditActivity ", id);
    const submodule = subModuleMaster.find(
      (submoduleData) => submoduleData.sub_module_id === id
    );
    navigate("/edit_sub_module_master", { state: { submodule } });
  };
  const handleViewActivity = (id) => {
    setPopoverId(popoverId === id ? null : id);
    console.log("id is from handleEditActivity ", id);
    const submodule = subModuleMaster.find(
      (submoduleData) => submoduleData.sub_module_id === id
    );
    navigate("/view_sub_module_master", { state: { submodule } });
  };

  const deleteModule = (id) => {
    console.log("id is for delete ", id);

    axios
      .delete(`${constantApi.baseUrl}/sub_module_master/${id}`)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.error("Error deleting module: ", err);
        alert("Failed to delete the module.");
      });
  };

  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [selectAll, setSelectAll] = useState(false); // Track header checkbox state
  const handleHeaderCheckbox = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allIds = subModuleMaster.map((item) => item.sub_module_id);
      setSelectedRows(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleRowCheckbox = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  useEffect(() => {
    console.log("Selected Row IDs:", selectedRows);
  }, [selectedRows]);

  // Filtered list based on search input
  const filteredModules = subModuleMaster.filter((sub_module) =>
    sub_module.sub_module_id.toString().includes(searchInput)
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Table header */}
      <div className="py-4 px-4 bg-white mt-8">
        <div className="flex justify-between items-center">
          <div className="flex  gap-8 items-center text-black">
            <div>
              <CgProfile className="text-black font-bold text-2xl" />
            </div>
            <div>
              <span className="font-bold text-xl">Sub Module Master</span>
            </div>
          </div>
          <div className="flex  gap-8 items-center text-black">
            <div>
              <Link to="/add_sub_module_master">
                <button className="py-2 bg-gray-100  rounded-lg px-4 text-black font-bold">
                  + New
                </button>
              </Link>
            </div>
            <div className="relative">
              <div>
                <GiHamburgerMenu
                  onClick={toggleMenu}
                  className="text-black font-bold text-2xl cursor-pointer"
                />
              </div>

              {isOpen && (
                <div className="absolute right-0 my-4 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                  {/* Arrow */}
                  <div className="absolute -top-2 right-2 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>

                  {/* Dropdown Content */}
                  <ul className="flex flex-col my-4 ">
                    <li className="hover:bg-gray-100  mx-2 rounded-md">
                      <button className="w-full text-left px-4 py-1 text-gray-700">
                        Import Order
                      </button>
                    </li>
                    <li className="hover:bg-gray-100  mx-2 rounded-md">
                      <button className="w-full text-left px-4 py-1 text-gray-700">
                        Export Orders
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <form className=" flex justify-end my-8">
            <div className="relative">
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} // Update state on change
                id="default-search"
                className="block w-full p-3 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by sub module ID"
                required
              />
            </div>
          </form>
        </div>

        {/* table body */}

        <table className="w-full text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-2 py-3">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleHeaderCheckbox}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </th>
              <th scope="col" className="px-2 py-3">
                Sub Module Name
              </th>

              <th scope="col" className="px-2 py-3">
                Sub Module Description
              </th>

              <th scope="col" className="px-2 py-3">
                Status
              </th>
              <th scope="col" className="px-2 py-3">
                Note 1
              </th>
              <th scope="col" className="px-2 py-3">
                Note 2
              </th>
              <th scope="col" className="px-2 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredModules.length > 0 ? (
              filteredModules.map((subModuleMasterData) => (
                <tr
                  key={subModuleMasterData.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
                >
                  <td className="px-2 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(
                        subModuleMasterData.sub_module_id
                      )}
                      onChange={() =>
                        handleRowCheckbox(subModuleMasterData.sub_module_id)
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </td>

                  <td className="px-2 py-4">
                    {subModuleMasterData.sub_module_name}
                  </td>
                  <td className="px-2 py-4">
                    {subModuleMasterData.sub_module_description}
                  </td>
                  <td className="px-2 py-4">
                    {subModuleMasterData.status === 1 ? "Active" : "Inactive"}
                  </td>
                  <td className="px-2 py-4">{subModuleMasterData.note1}</td>
                  <td className="px-2 py-4">{subModuleMasterData.note2}</td>

                  {/* <td className="px-6 py-4 text-center">
                    <FiMoreVertical
                      ref={(el) =>
                        (popoverRefs.current[subModuleMasterData.id] = el)
                      }
                      onClick={() =>
                        handleActivity(subModuleMasterData.sub_module_id)
                      }
                      className="flex justify-center cursor-pointer"
                    />

                    {popoverId === subModuleMasterData.sub_module_id && (
                      <div
                        data-popover
                        role="tooltip"
                        className="absolute inline-block w-32 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
                        style={{
                          top: `${
                            popoverRefs.current[
                              subModuleMasterData.sub_module_id
                            ]?.offsetHeight
                          }px`,
                          right: "0",
                          transform: "translateY(10px)",
                        }}
                      >
                        <div
                          onClick={() =>
                            handleEditActivity(
                              subModuleMasterData.sub_module_id
                            )
                          }
                          className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
                        >
                          <h3 className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                            Edit
                          </h3>
                        </div>
                        <div
                          onClick={() =>
                            deleteModule(subModuleMasterData.sub_module_id)
                          }
                          className="px-3 py-2"
                        >
                          <p className="font-bold text-black cursor-pointer">
                            Delete
                          </p>
                        </div>
                        <div data-popper-arrow></div>
                      </div>
                    )}
                  </td> */}
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block">
                      {/* More Options Icon */}
                      <FiMoreVertical
                        ref={(el) =>
                          (popoverRefs.current[
                            subModuleMasterData.sub_module_id
                          ] = el)
                        } // Store the reference to the button
                        onClick={() =>
                          handleActivity(subModuleMasterData.sub_module_id)
                        }
                        className="flex justify-center cursor-pointer"
                      />

                      {/* Dropdown Menu */}
                      {popoverId === subModuleMasterData.sub_module_id && (
                        <div
                          data-popover
                          role="tooltip"
                          className="absolute right-0 my-4 w-48 bg-white p-4 shadow-lg rounded-lg border border-gray-200 z-10"
                        >
                          {/* Arrow */}
                          <div className="absolute -top-2 right-2 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>

                          {/* Dropdown Content */}
                          <div
                            onClick={() =>
                              handleEditActivity(
                                subModuleMasterData.sub_module_id
                              )
                            }
                            className="px-2 py-1 hover:bg-blue-50  rounded-md flex justify-start items-center gap-4"
                          >
                            <BiSolidEdit className="border border-black p-1 text-3xl rounded-md " />
                            <p className="font-bold text-black cursor-pointer">
                              Edit
                            </p>
                          </div>
                          <div
                            onClick={() =>
                              deleteModule(subModuleMasterData.sub_module_id)
                            }
                            className="px-2 py-1 hover:bg-blue-50  rounded-md flex justify-start items-center gap-4"
                          >
                            <MdDeleteOutline className="border border-black p-1 text-3xl rounded-md " />
                            <p className="font-bold text-black cursor-pointer ">
                              Delete
                            </p>
                          </div>
                          <div
                            onClick={() =>
                              handleViewActivity(
                                subModuleMasterData.sub_module_id
                              )
                            }
                            className="px-2 py-1 hover:bg-blue-50  rounded-md flex justify-start items-center gap-4"
                          >
                            <CiViewTable className="border border-black p-1 text-3xl rounded-md " />
                            <p className="font-bold text-black cursor-pointer ">
                              View
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No sub module found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination />
      </div>
    </>
  );
};

export default Sub_Module_Masters;
