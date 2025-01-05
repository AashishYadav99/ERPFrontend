import { useState, useEffect } from "react";
import axios from "axios";
import constantApi from "../../constantApi";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

function MegaMenu() {
  const [modules, setModules] = useState([]);
  const [sub_modules, setSub_Modules] = useState([]);
  const [function_master, setFunction_master] = useState([]);
  const [filteredSubModules, setFilteredSubModules] = useState({});
  const [activeSubModuleId, setActiveSubModuleId] = useState(null);
  const [filteredFunctions, setFilteredFunctions] = useState([]);

  const handleSubModuleClick = (subModuleData) => {
    const subModuleId = subModuleData.sub_module_id;
    if (activeSubModuleId === subModuleId) {
      setActiveSubModuleId(null);
      setFilteredFunctions([]);
    } else {
      const filtered = function_master.filter(
        (func) => func.sub_module_id === subModuleId
      );
      setFilteredFunctions(filtered);
      setActiveSubModuleId(subModuleId);
    }
  };

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/module_master/list`)
      .then((res) => setModules(res.data.data))
      .catch((err) => console.error("Error fetching modules:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/sub_module_master/list`)
      .then((res) => {
        const subModules = res.data.data;
        setSub_Modules(subModules);

        // Pre-filter submodules for each module
        const filtered = {};
        subModules.forEach((subModule) => {
          if (!filtered[subModule.module_id]) {
            filtered[subModule.module_id] = [];
          }
          filtered[subModule.module_id].push(subModule);
        });
        setFilteredSubModules(filtered);
      })
      .catch((err) => console.error("Error fetching submodules:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/function_master/list`)
      .then((res) => setFunction_master(res.data.data))
      .catch((err) => console.error("Error fetching function master:", err));
  }, []);

  return (
    <nav className="px-4 py-2 fixed top-18 left-1/2 transform -translate-x-1/2 z-50 w-[95%] bg-gray-100 text-white shadow-lg rounded-lg h-screen overflow-y-auto ">
      <div className="flex justify-between items-center mb-4 px-4 shadow-gray-400 shadow-lg  bg-blue-900 rounded-lg ">
        <div>
          <h1 className="text-xl font-semibold">Menu</h1>
        </div>
        <div className="flex w-1/2 justify-between px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-2 border-2 border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div className="flex justify-between gap-4 items-center">
          <button className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300">
            Expand All
          </button>
          <button className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300">
            Collapse All
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-20">
        {modules.map((moduleData, index) => (
          <div key={index} className="flex flex-col">
            <h2 className="py-3 px-5 font-medium text-lg text-blue-600 border-b-2 border-gray-200">
              {moduleData.module_name}
            </h2>
            <div className="ml-6 mt-2">
              <div className="grid grid-cols-4 gap-4">
                {filteredSubModules[moduleData.module_id]?.map(
                  (subModuleData, subIndex) => (
                    <div
                      key={subIndex}
                      className="mb-4 p-3 border border-gray-300 rounded-md shadow-md"
                    >
                      <button
                        onClick={() => handleSubModuleClick(subModuleData)}
                        className={`text-md font-medium ${
                          activeSubModuleId === subModuleData.sub_module_id
                            ? "text-blue-400"
                            : "text-black"
                        }`}
                      >
                        {subModuleData.sub_module_name} +
                      </button>
                      {activeSubModuleId === subModuleData.sub_module_id && (
                        <ul className="ml-4 mt-2 space-y-2">
                          {filteredFunctions.map((func, funcIndex) => (
                            <li key={funcIndex} className="text-sm text-black">
                              {func.function_master_name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default MegaMenu;
