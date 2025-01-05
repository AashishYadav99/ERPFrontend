import { useLocation } from "react-router-dom";

function View_Sub_Module_Master() {
  const { state } = useLocation();
  console.log("state is ", state.submodule.submodule_id);

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Sub Module Details
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
              <td className="border border-gray-300 px-4 py-2">Module Name</td>
              <td className="border border-gray-300 px-4 py-2">
                {state.submodule.sub_module_name}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Description</td>
              <td className="border border-gray-300 px-4 py-2">
                {state.submodule.sub_module_description}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Notes</td>
              <td className="border border-gray-300 px-4 py-2">
                {state.submodule.note1}, {state.submodule.note2}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                Sorting Order
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {state.submodule.sorting_order}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Status</td>
              <td className="border border-gray-300 px-4 py-2">
                {state.submodule.status === 1 ? "Active" : "Inactive"}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">UUID</td>
              <td className="border border-gray-300 px-4 py-2">
                {state.submodule.uuid}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Created At</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(state.submodule.created_at).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Updated At</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(state.submodule.updated_at).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Created By</td>
              <td className="border border-gray-300 px-4 py-2">
                User {state.submodule.created_by}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Updated By</td>
              <td className="border border-gray-300 px-4 py-2">
                User {state.submodule.updated_by}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default View_Sub_Module_Master;
