import { useState } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import {
  FaWarehouse,
  FaLocationArrow,
  FaBuilding,
  FaBox,
  FaUsers,
  FaCartPlus,
  FaFileInvoice,
  FaMoneyBillWave,
  FaChartBar,
  FaTags,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function SideNavbar({ collapsed }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const menuItems = [
    { icon: <MdDashboardCustomize />, text: "Dashboard", route: "#" },
    { icon: <FaUsers />, text: "Module Master", route: "/module_master" },
    {
      icon: <FaUsers />,
      text: "Sub Module Master",
      route: "/sub_module_master",
    },
    { icon: <FaWarehouse />, text: "Warehouse", route: "/warehouse" },
    { icon: <FaLocationArrow />, text: "Location", route: "/location" },
    { icon: <FaBuilding />, text: "Company", route: "/company" },
    { icon: <FaBox />, text: "Item", route: "#" },
    { icon: <FaBox />, text: "Item Department", route: "#" },
    { icon: <FaBuilding />, text: "Brand Master", route: "/modulemasters" },
    { icon: <FaUsers />, text: "Employee", route: "#" },
    { icon: <FaCartPlus />, text: "Order", route: "#" },
    { icon: <FaCartPlus />, text: "Purchase Order", route: "#" },
    { icon: <FaTags />, text: "UOM", route: "#" },
    { icon: <FaTags />, text: "Tax Master", route: "#" },
    { icon: <FaBuilding />, text: "Supplier", route: "#" },
    { icon: <FaUsers />, text: "Customer", route: "#" },
    { icon: <FaUsers />, text: "Role", route: "#" },
    { icon: <FaTags />, text: "Sub Family Master", route: "#" },
    { icon: <FaTags />, text: "Item Category", route: "#" },
    { icon: <FaTags />, text: "Item Color", route: "#" },
    { icon: <FaTags />, text: "Family Master", route: "#" },
    { icon: <FaTags />, text: "Size Master", route: "#" },
    { icon: <FaFileInvoice />, text: "Invoice", route: "#" },
    { icon: <FaFileInvoice />, text: "Portfolio", route: "#" },
    { icon: <FaFileInvoice />, text: "Create Table", route: "#" },
    { icon: <FaFileInvoice />, text: "GRN", route: "#" },
    { icon: <FaChartBar />, text: "Report", route: "#" },
    { icon: <FaMoneyBillWave />, text: "Payment", route: "#" },
    { icon: <FaMoneyBillWave />, text: "POS", route: "#" },
  ];

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div
      className={`flex flex-col bg-gradient-to-b from-gray-800 to-black text-white px-4 py-8 transition-all duration-500 ease-in-out space-y-2 overflow-y-auto ${
        collapsed ? "w-28" : "w-72"
      }`}
      style={{ height: "100vh" }} // Ensures the side navbar takes the full height of the screen
    >
      {/* Ensure scrollable items */}
      <div className="space-y-2">
        <div className="flex justify-start items-center py-2 px-4  text-start rounded-lg cursor-pointer transition-all duration-300">
          <div className="p-2">
            <MdDashboardCustomize />
          </div>
          {!collapsed && (
            <button className="ml-1 text-white text-sm">
              Valansa Lifescience
            </button>
          )}
        </div>

        {/* Horizontal Line Below "Valansa Lifescience" */}
      </div>
      {!collapsed && <hr className="border-gray-600 my-4" />}

      {menuItems.map((item, index) => (
        <Link to={item.route}>
          <div
            key={index}
            className={`flex justify-start items-center py-2 px-4 text-start rounded-lg cursor-pointer transition-all duration-300
              ${
                activeIndex === index
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-600"
              }`}
            onClick={() => handleItemClick(index)} // Set the active index on click
          >
            <div className="p-2">{item.icon}</div>
            {!collapsed && (
              <button className="ml-3 text-gray-300">{item.text}</button>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SideNavbar;
