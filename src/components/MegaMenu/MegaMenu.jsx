import { useState, useEffect } from "react";
import axios from "axios";
import constantApi from "../../constantApi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { BiExpand, BiCollapse } from "react-icons/bi";

function MegaMenu() {
  const [modules, setModules] = useState([]);
  const [sub_modules, setSub_Modules] = useState([]);
  const [function_master, setFunction_master] = useState([]);
  const [filteredSubModules, setFilteredSubModules] = useState({});
  const [activeSubModuleId, setActiveSubModuleId] = useState(null);
  const [filteredFunctions, setFilteredFunctions] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleExpandAll = () => {
    if (expanded) {
      handleCollapseAll();
    } else {
      setExpanded(true);
      setActiveSubModuleId("all");
      const allFunctions = sub_modules.reduce((acc, subModule) => {
        const filtered = function_master.filter(
          (func) => func.sub_module_id === subModule.sub_module_id
        );
        return [...acc, ...filtered];
      }, []);
      setFilteredFunctions(allFunctions);
    }
  };

  const handleCollapseAll = () => {
    setExpanded(false);
    setActiveSubModuleId(null);
    setFilteredFunctions([]);
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
    <nav className="p-4 bg-gray-50 shadow-lg rounded-lg h-screen overflow-y-auto font-sans">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-blue-800">Mega Menu</h1>
        <div className="relative w-1/3">
          <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-8 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            className="text-gray-600 hover:text-blue-500 transition duration-300"
            onClick={handleExpandAll}
            title={expanded ? "Collapse All" : "Expand All"}
          >
            {expanded ? <BiCollapse size={20} /> : <BiExpand size={20} />}
          </button>
        </div>
      </header>

      <div className="space-y-4">
        {modules.map((moduleData, index) => (
          <div key={index} className="bg-white rounded-md shadow p-3">
            <h2 className="text-lg font-medium text-blue-700 mb-2">
              {moduleData.module_name}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {filteredSubModules[moduleData.module_id]?.map(
                (subModuleData, subIndex) => (
                  <div
                    key={subIndex}
                    className="border border-gray-200 rounded-md p-2 hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => setActiveSubModuleId(subModuleData.sub_module_id)}
                      className={`flex justify-between items-center w-full text-sm font-medium ${
                        expanded || activeSubModuleId === subModuleData.sub_module_id
                          ? "text-blue-600"
                          : "text-gray-800"
                      }`}
                    >
                      {subModuleData.sub_module_name}
                      {activeSubModuleId === subModuleData.sub_module_id ? (
                        <IoIosArrowUp className="ml-2" />
                      ) : (
                        <IoIosArrowDown className="ml-2" />
                      )}
                    </button>
                    {(expanded || activeSubModuleId === subModuleData.sub_module_id) && (
                      <ul className="mt-2 space-y-1">
                        {function_master
                          .filter((func) => func.sub_module_id === subModuleData.sub_module_id)
                          .map((func, funcIndex) => (
                            <li
                              key={funcIndex}
                              className="text-xs text-gray-600 hover:text-blue-500"
                            >
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
        ))}
      </div>
    </nav>
  );
}

export default MegaMenu;
