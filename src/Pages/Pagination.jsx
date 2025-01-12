import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ moduleMaster }) => {
  const [itemPerPage, setItemPerPage] = useState(5); // Default value of 5
  const [currentStart, setCurrentStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  //   const totallist = moduleMaster.length;
  const totallist = 50;

  const handleIncreasePage = () => {
    setCurrentStart((prev) =>
      Math.min(prev + parseInt(itemPerPage), totallist - itemPerPage)
    );
  };

  const handleDecreasePage = () => {
    setCurrentStart((prev) => Math.max(prev - parseInt(itemPerPage), 0));
  };

  const fetchData = async (page = 1, limit = 10) => {
    // try {
    //   const response = await axios.post("/api/moduleList", { page, limit });
    //   console.log("response", response);

    //   // const paginationData = response.data.data;
    //   // setData(paginationData.records);
    //   // setCurrentPage(paginationData.currentPage);
    //   // setTotalPages(paginationData.totalPages);
    //   // setTotalRecords(paginationData.totalRecords);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  useEffect(() => {
    fetchData(currentPage, itemPerPage);
  }, [currentPage, itemPerPage]);
  return (
    <div className="flex justify-end items-center gap-4 mt-4">
      <div>
        <span>Rows per page:</span>
      </div>
      <div className="relative inline-block">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setItemPerPage(e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <IoMdArrowDropdown className="absolute top-2 right-2 text-2xl pointer-events-none" />
      </div>
      <div>
        <span>
          {currentStart + 1} -{" "}
          {Math.min(currentStart + parseInt(itemPerPage), totallist)} of{" "}
        </span>
        <span>{totallist}</span>
      </div>
      <div className="flex justify-center items-center">
        <span>
          <MdKeyboardArrowLeft
            onClick={handleDecreasePage}
            className="text-2xl cursor-pointer"
          />
        </span>
        <span>
          <MdKeyboardArrowRight
            onClick={handleIncreasePage}
            className="text-2xl cursor-pointer"
          />
        </span>
      </div>
    </div>
  );
};

export default Pagination;
