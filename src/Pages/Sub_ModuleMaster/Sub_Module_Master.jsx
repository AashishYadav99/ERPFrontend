import React, { useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";

import axios from "axios"; // For API calls
import constantApi from "../../constantApi";

const Sub_Module_Masters = () => {
  const [subModuleMaster, setSubModuleMaster] = useState([]);
  const [popoverId, setPopoverId] = useState(null); // Track the currently open popover
  const popoverRefs = useRef({});
  // Fetch module IDs from the backend when the component mounts
  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/sub_module_master/list`)
      .then((res) => {
        console.log("response is from location ", res);

        setSubModuleMaster(res.data.data);
      })
      .catch((err) => {
        console.error("Error is ", err);
      });
  }, []);

  return (
    <>
      {/* Table header */}
      <div className="py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex  gap-8 items-center text-black">
            <div>
              <CgProfile className="text-black font-bold text-2xl" />
            </div>
            <div>
              <span className="font-bold text-xl">Warehouse</span>
            </div>
          </div>
          <div className="flex  gap-8 items-center text-black">
            <div>
              <Link to="/add_sub_module_master">
                <button className="py-2 bg-gray-300  rounded-lg px-4 text-black font-bold">
                  + New
                </button>
              </Link>
            </div>
            <div>
              <GiHamburgerMenu className="text-black font-bold text-2xl" />
            </div>
          </div>
        </div>

        <div>
          <form className=" flex justify-end my-8">
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-3 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
            </div>
          </form>
        </div>
      </div>
      {/* table body */}

      <table className="w-full text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            <th scope="col" className="px-2 py-3">
              <input
                checked
                id="checked-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </th>
            <th scope="col" className="px-2 py-3">
              created_at
            </th>
            <th scope="col" className="px-2 py-3">
              created_by
            </th>
            <th scope="col" className="px-2 py-3">
              sub_module_description
            </th>
            <th scope="col" className="px-2 py-3">
              sub_module_name
            </th>
            <th scope="col" className="px-2 py-3">
              sub_module_id
            </th>
            <th scope="col" className="px-2 py-3">
              STATUS
            </th>
            <th scope="col" className="px-2 py-3">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {subModuleMaster.length > 0 ? (
            subModuleMaster.map((subModuleMasterData) => (
              <tr
                key={subModuleMasterData.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
              >
                <td className="px-2 py-4">
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                <td className="px-2 py-4">
                  {new Date(subModuleMasterData.created_at).toLocaleDateString(
                    "en-GB"
                  )}
                </td>
                <td className="px-2 py-4">{subModuleMasterData.created_by}</td>
                <td className="px-2 py-4">
                  {subModuleMasterData.sub_module_description}
                </td>
                <td className="px-2 py-4">
                  {subModuleMasterData.sub_module_name}
                </td>
                <td className="px-2 py-4">
                  {subModuleMasterData.sub_module_id}
                </td>
                <td className="px-2 py-4">
                  {subModuleMasterData.status === 1 ? "Active" : "Inactive"}
                </td>
                <td className="px-6 py-4 text-center">
                  <FiMoreVertical
                    ref={(el) =>
                      (popoverRefs.current[subModuleMasterData.id] = el)
                    } // Store the reference to the button
                    onClick={() => handleActivity(subModuleMasterData.id)} // Trigger popover visibility toggle
                    className="flex justify-center"
                  />

                  {popoverId === subModuleMasterData.id && (
                    <div
                      data-popover
                      role="tooltip"
                      className="absolute inline-block w-32 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
                      style={{
                        top: `${
                          popoverRefs.current[subModuleMasterData.id]
                            ?.offsetHeight
                        }px`, // Position below the button
                        right: "0",
                        transform: "translateY(10px)", // Optional: slight offset
                      }}
                    >
                      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Edit
                        </h3>
                      </div>
                      <div className="px-3 py-2">
                        <p className="font-bold text-black">Delete</p>
                      </div>
                      <div data-popper-arrow></div>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center">
                No location found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Sub_Module_Masters;
