import { useState, useEffect } from "react";
import axios from "axios";
import constantApi from "../../constantApi";

function UserRole() {
  const [modules, setModules] = useState([]);
  const [sub_modules, setSub_Modules] = useState([]);
  const [function_master, setFunction_master] = useState([]);
  const [filteredSubModules, setFilteredSubModules] = useState({});
  const [checkboxState, setCheckboxState] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [locations, setLocations] = useState([]); // State for locations
  const [roles, setRoles] = useState([]); // State for roles
  const [selectedLocation, setSelectedLocation] = useState(""); // Selected location
  const [selectedRole, setSelectedRole] = useState(""); // Selected role

  // Fetch modules, submodules, functions, locations, and roles
  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/module_master/list`)
      .then((res) => setModules(res.data.data))
      .catch((err) => console.error("Error fetching modules:", err));

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

    axios
      .get(`${constantApi.baseUrl}/function_master/list`)
      .then((res) => {
        const functions = res.data.data;
        setFunction_master(functions);
        const initialState = {};
        functions.forEach((func) => {
          initialState[func.function_master_id] = {
            Edit: false,
            Delete: false,
            View: false,
            Rename: false,
          };
        });
        setCheckboxState(initialState);
      })
      .catch((err) => console.error("Error fetching function master:", err));

    // Example locations and roles, replace with API calls if necessary
    setLocations(["Location 1", "Location 2", "Location 3"]);
    setRoles(["Admin", "Editor", "Viewer"]);
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter table data based on search query
  const filteredData = modules.filter((module) => {
    return (
      module.module_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub_modules
        .filter((subModule) => subModule.module_id === module.module_id)
        .some((subModule) =>
          subModule.sub_module_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
    );
  });

  const handleActionChange = (functionId, action) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [functionId]: {
        ...prevState[functionId],
        [action]: !prevState[functionId][action],
      },
    }));
  };

  const handleSubmit = () => {
    const finalData = [];
  
    modules.forEach((moduleData) => {
      const subModules = filteredSubModules[moduleData.module_id] || [];
  
      // If there are no submodules, we still need to include a "null" entry.
      if (subModules.length === 0) {
        finalData.push({
          module: moduleData.module_name,
          submodule: null,
          function: null,
          actions: null,
        });
      }
  
      subModules.forEach((subModuleData) => {
        const functions = function_master.filter(
          (func) => func.sub_module_id === subModuleData.sub_module_id
        );
  
        // If there are no functions for the submodule, we add a "null" function and actions.
        if (functions.length === 0) {
          finalData.push({
            module: moduleData.module_name,
            submodule: subModuleData.sub_module_name,
            function: null,
            actions: null,
          });
        } else {
          functions.forEach((func) => {
            finalData.push({
              module: moduleData.module_name,
              submodule: subModuleData.sub_module_name,
              function: func.function_master_name,
              actions: {
                Edit: checkboxState[func.function_master_id]?.Edit || false,
                Delete: checkboxState[func.function_master_id]?.Delete || false,
                View: checkboxState[func.function_master_id]?.View || false,
                Rename: checkboxState[func.function_master_id]?.Rename || false,
              },
            });
          });
        }
      });
    });
  
    // Now submit the final data
    axios
      .post(`${constantApi.baseUrl}/user_role/create`, { data: finalData })
      .then((res) => {
        console.log("Data submitted successfully:", res.data);
        alert("Data submitted successfully!");
      })
      .catch((err) => {
        
        console.log(finalData);
        console.error("Error submitting data:", err);
        alert("Failed to submit data. Please try again.");
      });
  };  

  return (
    <div className="px-4 py-6 bg-white text-gray-800 shadow-lg rounded-lg max-w-7xl mx-auto overflow-x-auto">
      <h6 className="text-2xl font-semibold mb-6">
        Assign Roles, Permissions, and Actions to User Groups
      </h6>
      
      {/* Location and Role Dropdowns */}
      <div className="mb-6 flex space-x-6">
        <div className="w-1/3">
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location
          </label>
          <select
            id="location"
            className="w-full p-2 text-sm border rounded-lg"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/3">
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Role
          </label>
          <select
            id="role"
            className="w-full p-2 text-sm border rounded-lg"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Select Role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Search Box */}
        <div className="w-1/3">
          <label htmlFor="search" className="block text-sm font-medium mb-2">
            Search
          </label>
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

      {/* Table with sticky header */}
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
          {filteredData.map((moduleData, index) => {
            const subModules = filteredSubModules[moduleData.module_id] || [];
            if (subModules.length === 0) {
              return (
                <tr key={index} className="bg-gray-100">
                  <td className="px-3 py-1 border">{moduleData.module_name}</td>
                  <td className="px-3 py-1 border">No Submodule</td>
                  <td className="px-3 py-1 border">No Function</td>
                  <td className="px-3 py-1 border">-</td>
                </tr>
              );
            }
            return subModules.map((subModuleData, subIndex) => {
              const functions = function_master.filter(
                (func) => func.sub_module_id === subModuleData.sub_module_id
              );
              if (functions.length === 0) {
                return (
                  <tr key={`${index}-${subIndex}`} className="bg-gray-100">
                    <td className="px-3 py-1 border">{moduleData.module_name}</td>
                    <td className="px-3 py-1 border">{subModuleData.sub_module_name}</td>
                    <td className="px-3 py-1 border">No Function</td>
                    <td className="px-3 py-1 border">-</td>
                  </tr>
                );
              }
              return functions.map((func, funcIndex) => (
                <tr
                  key={`${index}-${subIndex}-${funcIndex}`}
                  className="hover:bg-gray-50"
                >
                  {funcIndex === 0 && (
                    <td
                      rowSpan={functions.length}
                      className="px-3 py-1 border bg-blue-100"
                    >
                      {moduleData.module_name}
                    </td>
                  )}
                  {funcIndex === 0 && (
                    <td
                      rowSpan={functions.length}
                      className="px-3 py-1 border bg-green-100"
                    >
                      {subModuleData.sub_module_name}
                    </td>
                  )}
                  <td className="px-3 py-1 border bg-yellow-100">
                    {func.function_master_name}
                  </td>
                  <td className="px-3 py-1 border">
                    {["Edit", "Delete", "View", "Rename"].map((action) => (
                      <label
                        key={action}
                        className="inline-flex items-center mr-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={checkboxState[func.function_master_id]?.[action] || false}
                          onChange={() => handleActionChange(func.function_master_id, action)}
                          className="mr-2"
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
