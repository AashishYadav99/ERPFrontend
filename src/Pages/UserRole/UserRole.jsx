import axios from "axios";
import { useEffect, useState } from "react";
import constantApi from "../../constantApi";

function UserRole() {
  const [functionName, setFunctionName] = useState([]);
  const roles = [
    "System Administrator",
    "Superuser",
    "Business Administrator",
    "Finance Manager",
    "HR Manager",
    "Warehouse Manager",
    "Procurement Manager",
    "Sales Manager",
    "Production Manager",
    "Quality Control Manager",
    "Supply Chain Manager",
    "Project Manager",
    "End Users",
    "Reports User",
    "Security Administrator",
  ];

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/function_master/list`)
      .then((res) => {
        setFunctionName(res.data.data);
      })
      .catch((err) => console.error("Error fetching function master:", err));
  }, []);

  return (
    <div className="p-4">
      <div className="border border-gray-300 rounded-lg shadow-md">
        {/* Role */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Role</label>
          <select
            name="role"
            required
            className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            <option value="" disabled>
              Select a role
            </option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center border-2 bg-blue-900 text-white border-blue-800 my-2 px-4 rounded-lg">
          <div>
            <p className="font-semibold">Permission</p>
          </div>
          <div>
            <button className="border border-blue-500 bg-white text-black hover:text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300">
              Save
            </button>
          </div>
        </div>

        {/* Table Rows */}
        {functionName.map((data, index) => (
          <div key={index} className="border-t border-gray-300">
            {/* Function Name Row */}
            <div className="flex items-center p-4">
              <div className="w-1/4 font-medium">
                {data.function_master_name}
              </div>
              <div className="w-3/4 flex justify-between">
                <div className="w-1/3 text-center">Allow All</div>
                <div className="w-1/3 text-center">Deny All</div>
                <div className="w-1/3 text-center">Override All</div>
              </div>
            </div>

            {/* Action Rows */}
            {functionName.map((action, actionIndex) => (
              <div
                key={actionIndex}
                className="flex items-center p-4 bg-gray-50"
              >
                <div className="w-1/4 text-gray-700">{action.note1}</div>
                <div className="w-3/4 flex justify-between">
                  <div className="w-1/3 text-center">
                    <input
                      type="radio"
                      name={`permission-${index}`}
                      value="Allow All"
                      className="form-radio"
                    />
                  </div>
                  <div className="w-1/3 text-center">
                    <input
                      type="radio"
                      name={`permission-${index}`}
                      value="Deny All"
                      className="form-radio"
                    />
                  </div>
                  <div className="w-1/3 text-center">
                    <input
                      type="radio"
                      name={`permission-${index}`}
                      value="Override All"
                      className="form-radio"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRole;
