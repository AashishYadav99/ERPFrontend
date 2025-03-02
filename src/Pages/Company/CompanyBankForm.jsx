import React from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const CompanyBankForm = ({ banks = [{}], setFormData }) => {
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedBanks = [...prev.banks];
      updatedBanks[index] = {
        ...updatedBanks[index],
        [name]: value,
      };

      return {
        ...prev,
        banks: updatedBanks,
      };
    });
  };

  const addBanks = () => {
    setFormData((prev) => ({
      ...prev,
      banks: [...prev.banks, {}], // Add a new address object to the array
    }));
  };

  const removeRow = (index) => {
    setFormData((prev) => {
      const updatedBanks = prev.banks.filter((_, i) => i !== index);
      return { ...prev, banks: updatedBanks };
    });
  };

  return (
    <div className="p-4 border rounded mb-4 bg-white">
      <h2 className="text-lg font-bold mb-4">Add Banks</h2>
      <div className="overflow-x-auto max-w-full sm:max-w-lg md:max-w-5xl lg:max-w-5xl xl:max-w-5xl custom-scrollbar">
        <div className="flex flex-wrap gap-4 min-w-[1000px]">
          {" "}
          {/* Set min-width for scroll */}
          {banks.map((addr, index) => (
            <div
              key={index}
              className="flex gap-4 mb-4 w-full"
              style={{ minWidth: "1200px" }}
            >
              {" "}
              {/* Make each form take full width */}
              <div className="mb-4 min-w-[200px]">
                <label className="block text-sm font-medium mb-1">
                  Company Banks (Entry {index + 1})
                </label>
                <input
                  type="text"
                  name="bank_account_number"
                  value={addr.bank_account_number || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Company Banks "
                />
              </div>
              <div className="mb-4  min-w-[200px]">
                <label className="block text-sm font-medium mb-1">
                  Branch Name
                </label>
                <input
                  type="text"
                  name="branch_name"
                  value={addr.branch_name || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Branch Name"
                />
              </div>
              <div className="mb-4  min-w-[200px]">
                <label className="block text-sm font-medium mb-1">
                  Beneficiary Name
                </label>
                <input
                  type="text"
                  name="beneficiary_name"
                  value={addr.beneficiary_name || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder=" Beneficiary Name"
                />
              </div>
              <div className="mb-4  min-w-[200px]">
                <label className="block text-sm font-medium mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contact_name"
                  value={addr.contact_name || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Contact Name"
                />
              </div>
              <div className="mb-4  min-w-[200px]">
                <label className="block text-sm font-medium mb-1">
                  Contact No
                </label>
                <input
                  type="text"
                  name="contact_no"
                  value={addr.contact_no || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Contact No"
                />
              </div>
              <div className="mb-4  min-w-[200px]">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={addr.email || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4  min-w-[200px]">
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={addr.address || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Address"
                />
              </div>
              <div className="mb-4  min-w-[200px]">
                <label className="block text-sm font-medium mb-1">
                  Paying Bank
                </label>
                <input
                  type="text"
                  name="paying_bank"
                  value={addr.paying_bank || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="px-4 py-2 border rounded w-full"
                  placeholder="Paying Bank"
                />
              </div>
              {/* Remove Button */}
              <div className="flex-1 min-w-[50px]">
                <button
                  onClick={() => removeRow(index)}
                  className="mt-6 text-red-600 hover:underline"
                >
                  {/* Remove */}
                  <IoMdRemoveCircleOutline className="text-2xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={addBanks}
        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
      >
        Add More Banks
      </button>
    </div>
  );
};

export default CompanyBankForm;
