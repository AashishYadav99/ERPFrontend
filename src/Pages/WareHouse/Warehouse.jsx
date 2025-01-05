import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";
import constantApi from "../../constantApi";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
function Warehouse() {
  const [warehouses, setWarehouses] = useState([]);
  const [popoverId, setPopoverId] = useState(null); // Track the currently open popover
  const popoverRefs = useRef({}); // Ref to store button references for each row

  useEffect(() => {
    axios
      .post(`${constantApi.baseUrl}/warehouse_master/list`, {
        page: 1,
        limit: 10,
      })
      .then((res) => {
        setWarehouses(res.data.data.records);
      })
      .catch((err) => {
        console.error("Error is ", err);
      });
  }, []);

  // Handle button click to toggle popover visibility
  const handleActivity = (id) => {
    setPopoverId(popoverId === id ? null : id);
  };
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
              <button className="py-2 bg-gray-300  rounded-lg px-4 text-black font-bold">
                + New
              </button>
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

      {/* Tabke Body */}

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
              Code
            </th>
            <th scope="col" className="px-2 py-3">
              Description
            </th>
            <th scope="col" className="px-2 py-3">
              Location
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Notes
            </th> */}
            <th scope="col" className="px-2 py-3">
              Status
            </th>
            <th scope="col" className="px-2 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {warehouses.length > 0 ? (
            warehouses.map((warehouse) => (
              <tr
                key={warehouse.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
              >
                <td className="px-2 py-4">
                  {" "}
                  <input
                    checked
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                <td className="px-2 py-4">{warehouse.whcode}</td>
                <td className="px-2 py-4">{warehouse.whdesc}</td>
                <td className="px-2 py-4">{warehouse.locdesc || "N/A"}</td>
                {/* <td className="px-6 py-4">
                  <p>{warehouse.note1}</p>
                  <p>{warehouse.note2}</p>
                  <p>{warehouse.note3}</p>
                </td> */}
                <td className="px-2 py-4">
                  {warehouse.status === 1 ? "Active" : "Inactive"}
                </td>
                <td className="px-6 py-4 text-center">
                  <FiMoreVertical
                    ref={(el) => (popoverRefs.current[warehouse.id] = el)} // Store the reference to the button
                    onClick={() => handleActivity(warehouse.id)} // Trigger popover visibility toggle
                    className=" flex justify-center"
                  />

                  {/* Popover */}
                  {popoverId === warehouse.id && (
                    <div
                      data-popover
                      role="tooltip"
                      className="absolute  inline-block w-32 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
                      style={{
                        top: `${
                          popoverRefs.current[warehouse.id]?.offsetHeight
                        }px`, // Position below the button
                        right: "0",
                        transform: "translateY(10px)", // Optional: slight offset for better visibility
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
              <td colSpan="7" className="px-6 py-4 text-center">
                No warehouses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Warehouse;
