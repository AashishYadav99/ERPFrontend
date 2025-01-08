import { useState, useEffect } from "react";
import axios from "axios";
import constantApi from "../../constantApi";

function UserRole() {
  const [modules, setModules] = useState([]);
  const [sub_modules, setSub_Modules] = useState([]);
  const [function_master, setFunction_master] = useState([]);
  const [filteredSubModules, setFilteredSubModules] = useState({});
  const [checkboxState, setCheckboxState] = useState({}); // State to track checkboxes for actions

  // Fetch modules
  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/module_master/list`)
      .then((res) => setModules(res.data.data))
      .catch((err) => console.error("Error fetching modules:", err));
  }, []);

  // Fetch submodules and filter them
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

  // Fetch functions
  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/function_master/list`)
      .then((res) => {
        const functions = res.data.data;
        setFunction_master(functions);

        // Initialize checkbox state for actions
        const initialState = {};
        functions.forEach((func) => {
          initialState[func.function_master_id] = {
            Edit: false,
            Delete: false,
            View: false,
            Rename: false,
          }; // Default unchecked for all actions
        });
        setCheckboxState(initialState);
      })
      .catch((err) => console.error("Error fetching function master:", err));
  }, []);

  // Handle action checkbox change
  const handleActionChange = (functionId, action) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [functionId]: {
        ...prevState[functionId],
        [action]: !prevState[functionId][action], // Toggle the checkbox value
      },
    }));
  };

  // Handle submit button click
  const handleSubmit = () => {
    const finalData = modules.map((moduleData) => {
      const subModules = filteredSubModules[moduleData.module_id] || [];
      if (subModules.length === 0) {
        return {
          module: moduleData.module_name,
          submodules: "No Submodule Available",
        };
      }
      return {
        module: moduleData.module_name,
        submodules: subModules.map((subModuleData) => {
          const functions = function_master.filter(
            (func) => func.sub_module_id === subModuleData.sub_module_id
          );

          if (functions.length === 0) {
            return {
              submodule: subModuleData.sub_module_name,
              functions: "No Function Available",
            };
          }

          return {
            submodule: subModuleData.sub_module_name,
            functions: functions.map((func) => ({
              function: func.function_master_name,
              actions: checkboxState[func.function_master_id] || {},
            })),
          };
        }),
      };
    });

    console.log("Submitted Data:", finalData);
  };

  return (
    <div className="px-4 py-2 z-50 w-[95%] bg-gray-100 text-black shadow-lg rounded-lg h-auto overflow-x-auto">
      <h1 className="text-xl font-semibold mb-4">
        Module, Submodule, and Functions
      </h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Module Name</th>
            <th className="px-4 py-2 border">Sub Module Name</th>
            <th className="px-4 py-2 border">Function Name</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((moduleData, index) => {
            const subModules = filteredSubModules[moduleData.module_id] || [];
            if (subModules.length === 0) {
              return (
                <tr key={index}>
                  <td className="px-4 py-2 border">{moduleData.module_name}</td>
                  <td className="px-4 py-2 border">No Submodule</td>
                  <td className="px-4 py-2 border">No Function</td>
                  <td className="px-4 py-2 border">-</td>
                </tr>
              );
            }
            return subModules.map((subModuleData, subIndex) => {
              const functions = function_master.filter(
                (func) => func.sub_module_id === subModuleData.sub_module_id
              );

              if (functions.length === 0) {
                return (
                  <tr key={`${index}-${subIndex}`}>
                    <td className="px-4 py-2 border">
                      {moduleData.module_name}
                    </td>
                    <td className="px-4 py-2 border">
                      {subModuleData.sub_module_name}
                    </td>
                    <td className="px-4 py-2 border">No Function</td>
                    <td className="px-4 py-2 border">-</td>
                  </tr>
                );
              }
              return functions.map((func, funcIndex) => (
                <tr key={`${index}-${subIndex}-${funcIndex}`}>
                  {funcIndex === 0 && (
                    <td
                      rowSpan={functions.length}
                      className="px-4 py-2 border bg-red-400"
                    >
                      {moduleData.module_name}
                    </td>
                  )}
                  {funcIndex === 0 && (
                    <td
                      rowSpan={functions.length}
                      className="px-4 py-2 border bg-green-600"
                    >
                      {subModuleData.sub_module_name}
                    </td>
                  )}
                  <td className="px-4 py-2 border bg-blue-600">
                    {func.function_master_name}
                  </td>
                  <td className="px-4 py-2 border">
                    {["Edit", "Delete", "View", "Rename"].map((action) => (
                      <label
                        key={action}
                        className="inline-flex items-center mr-4"
                      >
                        <input
                          type="checkbox"
                          checked={
                            checkboxState[func.function_master_id]?.[action] ||
                            false
                          }
                          onChange={() =>
                            handleActionChange(func.function_master_id, action)
                          }
                          className="mr-1"
                        />
                        {action}
                      </label>
                    ))}
                  </td>
                </tr>
              ));
            });
          })}
        </tbody>
      </table>
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded shadow"
      >
        Submit
      </button>
    </div>
  );
}

export default UserRole;
