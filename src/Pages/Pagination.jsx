import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ moduleMaster }) => {
  const [itemPerPage, setItemPerPage] = useState(5); // Default value of 5
  const [currentStart, setCurrentStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const totallist = 50; // Replace with moduleMaster.length if applicable

  const handleIncreasePage = () => {
    setCurrentStart((prev) =>
      Math.min(prev + parseInt(itemPerPage), totallist - itemPerPage)
    );
    setCurrentPage((prev) => prev + 1);
  };

  const handleDecreasePage = () => {
    setCurrentStart((prev) => Math.max(prev - parseInt(itemPerPage), 0));
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const fetchData = async (page = 1, limit = 10) => {
    try {
      const response = await axios.post("/api/moduleList", { page, limit });
      console.log("response", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, itemPerPage);
  }, [currentPage, itemPerPage]);

  return (
    <div className="flex justify-between items-center mt-4 p-2 bg-white rounded-lg shadow-md">
      {/* Rows per page */}
      <div className="flex items-center gap-3 text-gray-600">
        <span className="text-sm font-medium">Rows per page:</span>
        <div className="relative">
          <select
            className="block appearance-none w-16 bg-gray-50 border border-gray-300 px-3 py-1.5 rounded-md text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            value={itemPerPage}
            onChange={(e) => setItemPerPage(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <IoMdArrowDropdown className="absolute top-2 right-2 text-gray-500" />
        </div>
      </div>

      {/* Pagination Info */}
      <div className="text-sm font-medium text-gray-600">
        <span>
          {currentStart + 1} - {Math.min(currentStart + parseInt(itemPerPage), totallist)} of {totallist}
        </span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        <button
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentPage > 1
              ? "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          } shadow`}
          onClick={handleDecreasePage}
          disabled={currentPage <= 1}
        >
          <MdKeyboardArrowLeft className="text-lg" />
        </button>
        <button
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStart + parseInt(itemPerPage) < totallist
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          } shadow`}
          onClick={handleIncreasePage}
          disabled={currentStart + parseInt(itemPerPage) >= totallist}
        >
          <MdKeyboardArrowRight className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
