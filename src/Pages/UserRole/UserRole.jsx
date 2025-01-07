import { useState, useEffect } from "react";
import axios from "axios";
import constantApi from "../../constantApi";

function UserRole() {
  const [modules, setModules] = useState([]);
  const [sub_modules, setSub_Modules] = useState([]);
  const [function_master, setFunction_master] = useState([]);
  const [filteredSubModules, setFilteredSubModules] = useState({});

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
        console.log("filtered", filtered);
      })
      .catch((err) => console.error("Error fetching submodules:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/function_master/list`)
      .then((res) => setFunction_master(res.data.data))
      .catch((err) => console.error("Error fetching function master:", err));
  }, []);

  const data = [
    {
      documentType: "Leave Allocation",
      roles: [
        {
          role: "HR Manager",
          level: 0,
          permissions: {
            read: true,
            write: true,
            create: true,
            delete: true,
            submit: true,
            cancel: true,
            share: true,
          },
        },
      ],
    },
  ];

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
            <th className="px-4 py-2 border">Actions </th>
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

                  <tbody>
                    {data.map((item, index) =>
                      item.roles.map((role, idx) => (
                        <tr
                          key={`${index}-${idx}`}
                          className="hover:bg-gray-100"
                        >
                          <td className="border border-gray-300 p-2">
                            <div className="grid grid-cols-4 gap-2">
                              {Object.entries(role.permissions).map(
                                ([key, value]) => (
                                  <div key={key} className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={value}
                                      className="mr-2"
                                      readOnly
                                    />
                                    <label className="text-sm">{key}</label>
                                  </div>
                                )
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </tr>
              ));
            });
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserRole;
