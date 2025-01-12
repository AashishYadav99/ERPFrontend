import { useLocation } from "react-router-dom";

function View_User_Management() {
  const { state } = useLocation();
  const user = state?.user_management || {};
  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        User Details
      </h2>
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Field</th>
            <th className="border border-gray-300 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">First Name</td>
            <td className="border border-gray-300 px-4 py-2">
              {user.first_name}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Last Name</td>
            <td className="border border-gray-300 px-4 py-2">
              {user.last_name}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Email</td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Phone Number</td>
            <td className="border border-gray-300 px-4 py-2">
              {user.phone_number}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Organisation</td>
            <td className="border border-gray-300 px-4 py-2">
              {user.organisation}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Location</td>
            <td className="border border-gray-300 px-4 py-2">
              {user.location}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Status</td>
            <td className="border border-gray-300 px-4 py-2">
              {user.status === 1 ? "Active" : "Inactive"}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Created At</td>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(user.created_at).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Updated At</td>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(user.updated_at).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Created By</td>
            <td className="border border-gray-300 px-4 py-2">
              User {user.created_by}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Updated By</td>
            <td className="border border-gray-300 px-4 py-2">
              User {user.updated_by}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default View_User_Management;
