import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import constantApi from "../../constantApi";

function UserRole() {
  const [modules, setModules] = useState([]);
  const [sub_modules, setSub_Modules] = useState([]);
  const [function_master, setFunction_master] = useState([]);
  const [filteredSubModules, setFilteredSubModules] = useState({});
  const [checkboxState, setCheckboxState] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); 
  const [locations, setLocations] = useState([]); 
  const [roles, setRoles] = useState([]); 
  const [selectedLocation, setSelectedLocation] = useState(""); 
  const [selectedRoles, setSelectedRoles] = useState(); 
  const [actionMaster, setActionMaster] = useState([]); 
  const [functionActionMap, setFunctionActionMap] = useState([]); 
  const [existingPermissions, setExistingPermissions] = useState([]); // Step 1: Store existing permissions

  useEffect(() => {
    // Fetching all data like modules, sub-modules, function masters, etc.
    axios.get(`${constantApi.baseUrl}/module_master/list`)
      .then((res) => setModules(res.data.data))
      .catch((err) => console.error("Error fetching modules:", err));

    axios.get(`${constantApi.baseUrl}/sub_module_master/list`)
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

    axios.get(`${constantApi.baseUrl}/function_master/list`)
      .then((res) => {
        const functions = res.data.data;
        setFunction_master(functions);
        const initialState = {};
        functions.forEach((func) => {
          initialState[func.function_master_id] = {};
        });
        setCheckboxState(initialState);
      })
      .catch((err) => console.error("Error fetching function master:", err));

    axios.get(`${constantApi.baseUrl}/action_master/list`)
      .then((res) => setActionMaster(res.data.data))
      .catch((err) => console.error("Error fetching action master:", err));

    axios.get(`${constantApi.baseUrl}/function_action_master_map/list`)
      .then((res) => setFunctionActionMap(res.data.data))
      .catch((err) => console.error("Error fetching function-action mapping:", err));

    setRoles([
      { value: 1, label: "System Administrator" },
      { value: 2, label: "Superuser" },
      { value: 3, label: "Business Administrator" },
      { value: 4, label: "Finance Manager" },
      { value: 5, label: "HR Manager" },
      { value: 6, label: "Warehouse Manager" },
      { value: 7, label: "Procurement Manager" },
      { value: 8, label: "Sales Manager" },
      { value: 9, label: "Production Manager" },
      { value: 10, label: "Quality Control Manager" },
      { value: 11, label: "Supply Chain Manager" },
      { value: 12, label: "Project Manager" },
      { value: 13, label: "End Users" },
      { value: 14, label: "Reports User" },
      { value: 15, label: "Security Administrator" },
    ]);
  }, []);

  useEffect(() => {
    console.log(selectedRoles);
    // Fetch existing permissions when roles are selected
    if (selectedRoles) {
      const roleId = selectedRoles.value; // Assuming selectedRole is an object with a 'value' field
      const url = `${constantApi.baseUrl}/user_group/permissions/${roleId}`;  // Sending single role_id
      axios.get(url)
        .then((res) => {
          setExistingPermissions(res.data.data); // Store existing permissions
          const updatedCheckboxState = { ...checkboxState };

          // Pre-check checkboxes based on existing permissions
          res.data.data.forEach(permission => {
            const { function_master_id, action_id } = permission;
            const actionName = actionMaster.find(action => action.action_id === action_id)?.action_name;

            if (actionName) {
              updatedCheckboxState[function_master_id] = {
                ...updatedCheckboxState[function_master_id],
                [actionName]: 1, // Mark checkbox as checked
              };
            }
          });

          setCheckboxState(updatedCheckboxState); // Update checkbox state
        })
        .catch((err) => console.error("Error fetching existing permissions:", err));
    }
  }, [selectedRoles, actionMaster, checkboxState]);

  const handleSearch = (event) => setSearchQuery(event.target.value);

  const handleActionChange = (functionId, action) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [functionId]: {
        ...prevState[functionId],
        [action]: prevState[functionId]?.[action] === 1 ? 0 : 1, // Toggle between 1 and 0
      },
    }));
  };

  const handleRoleChange = (selectedOptions) => setSelectedRoles(selectedOptions || []);

  const handleSubmit = () => {
    const finalData = [];
  
    modules.forEach((moduleData) => {
      const subModules = filteredSubModules[moduleData.module_id] || [];
  
      subModules.forEach((subModuleData) => {
        const functions = function_master.filter(
          (func) => func.sub_module_id === subModuleData.sub_module_id
        );
  
        functions.forEach((func) => {
          const actionsForFunction = functionActionMap
            .filter((map) => map.function_master_id === func.function_master_id)
            .map((map) => map.action_id);
  
          // Gather all selected actions for the function
          const actions = actionMaster
            .filter((action) => actionsForFunction.includes(action.action_id))
            .reduce((acc, action) => {
              const actionValue = checkboxState[func.function_master_id]?.[action.action_name] || 0;
  
              if (actionValue === 1) {
                acc.push(action.action_id); // Add the selected action_id to the list
              }
              return acc;
            }, []);
  
          // If actions are selected, push multiple rows
          actions.forEach((actionId) => {
            selectedRoles.forEach((role) => {
              // Prevent duplicate submissions for same role and action
              if (!existingPermissions.some(permission => permission.role_id === role.value && permission.action_id === actionId)) {
                finalData.push({
                  module_id: moduleData.module_id,
                  sub_module_id: subModuleData.sub_module_id,
                  function_master_id: func.function_master_id,
                  role_id: role.value, // Role ID
                  action_id: actionId,  // Specific action_id for the row
                });
              }
            });
          });
        });
      });
    });
  
    // Submit the final data only if there is data to submit
    if (finalData.length > 0) {
      axios
        .post(`${constantApi.baseUrl}/user_group/bulk`, { data: finalData }, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((res) => {
          console.log("Data submitted successfully:", res.data);
          alert("Data submitted successfully!");
        })
        .catch((err) => {
          console.error("Data submission failed:", err);
          alert("Data failed. Please check.");
        });
    } else {
      alert("No actions selected. Please select at least one action.");
    }
  };
  
  return (
    <div className="px-4 py-6 bg-white text-gray-800 shadow-lg rounded-lg max-w-7xl mx-auto overflow-x-auto">
      <h6 className="text-2xl font-semibold mb-6">Assign Roles, Permissions, and Actions to User Groups</h6>
      
      {/* Role Dropdown */}
      <div className="mb-6 flex space-x-6">
        <div className="w-1/3">
          <label htmlFor="roles" className="block text-sm font-medium mb-2">Role</label>
          <CreatableSelect
            id="roles"
            options={roles}
            value={selectedRoles}
            onChange={handleRoleChange}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            placeholder="Select Role"
          />
        </div>

        {/* Search Box */}
        <div className="w-1/3">
          <label htmlFor="search" className="block text-sm font-medium mb-2">Search</label>
          <input
            id="search"
            type="text"
            className="w-full p-2 text-sm border rounded-lg"
            placeholder="Search across table..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Table with Permissions */}
      <table className="w-full table-auto border-separate border-spacing-0">
        <thead className="bg-gray-200 text-sm text-gray-600 sticky top-0">
          <tr>
            <th className="px-3 py-1 border">Module</th>
            <th className="px-3 py-1 border">Sub Module</th>
            <th className="px-3 py-1 border">Function</th>
            <th className="px-3 py-1 border">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {modules.map((moduleData, index) => {
            const subModules = filteredSubModules[moduleData.module_id] || [];
            return subModules.map((subModuleData, subIndex) => {
              const functions = function_master.filter(
                (func) => func.sub_module_id === subModuleData.sub_module_id
              );
              return functions.map((func, funcIndex) => {
                const actionsForFunction = functionActionMap
                  .filter((map) => map.function_master_id === func.function_master_id)
                  .map((map) => map.action_id);

                return (
                  <tr key={`${index}-${subIndex}-${funcIndex}`} className="hover:bg-gray-50">
                    {funcIndex === 0 && (
                      <td rowSpan={functions.length} className="px-3 py-1 border bg-blue-100">
                        {moduleData.module_name}
                      </td>
                    )}
                    {funcIndex === 0 && (
                      <td rowSpan={functions.length} className="px-3 py-1 border bg-green-100">
                        {subModuleData.sub_module_name}
                      </td>
                    )}
                    <td className="px-3 py-1 border bg-yellow-100">
                      {func.function_master_name}
                    </td>
                    <td className="px-3 py-1 border">
                      {actionMaster
                        .filter((action) => actionsForFunction.includes(action.action_id))
                        .map((action) => (
                          <label key={action.action_id} className="inline-flex items-center mr-2 text-sm">
                            <input
                              type="checkbox"
                              checked={checkboxState[func.function_master_id]?.[action.action_name] === 1}
                              onChange={() => handleActionChange(func.function_master_id, action.action_name)}
                              className="mr-2"
                            />
                            {action.action_name}
                          </label>
                        ))}
                    </td>
                  </tr>
                );
              });
            });
          })}
        </tbody>
      </table>

      {/* Submit Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default UserRole;
