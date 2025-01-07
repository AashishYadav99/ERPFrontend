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
import { Link, useLocation } from "react-router-dom";

function SideNavbar({ collapsed }) {
  const location = useLocation(); // Get the current location

  const menuItems = [
    { icon: <MdDashboardCustomize />, text: "Dashboard", route: "#" },
    { icon: <FaUsers />, text: "Module Master", route: "/module_master" },
    { icon: <FaUsers />, text: "Sub Module Master", route: "/sub_module_master" },
    { icon: <FaUsers />, text: "Function Master", route: "/function_master" },
    { icon: <FaWarehouse />, text: "User Role", route: "/userrole" },
    { icon: <FaWarehouse />, text: "Warehouse", route: "/warehouse" },
    { icon: <FaLocationArrow />, text: "Location", route: "/location" },
    { icon: <FaBuilding />, text: "Company", route: "/company" },
    { icon: <FaBox />, text: "User Management", route: "/user_management" },
    { icon: <FaBox />, text: "Item", route: "#" },
    { icon: <FaBuilding />, text: "Brand Master", route: "/modulemasters" },
    { icon: <FaTags />, text: "UOM", route: "#" },
    { icon: <FaTags />, text: "Tax Master", route: "#" },
    { icon: <FaTags />, text: "Item Category", route: "#" },
    { icon: <FaTags />, text: "Family Master", route: "#" },
    { icon: <FaChartBar />, text: "Report", route: "#" },
    { icon: <FaMoneyBillWave />, text: "Payment", route: "#" },
  ];

  return (
    <div
      className={`flex flex-col bg-gradient-to-b from-gray-900 to-gray-700 text-white px-4 py-6 transition-all duration-500 ease-in-out space-y-2 overflow-y-auto ${
        collapsed ? "w-20" : "w-64"
      }`}
      style={{ height: "100vh" }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-start mb-6">
        <div className="text-2xl text-blue-500 p-2">
          <MdDashboardCustomize />
        </div>
        {!collapsed && (
          <span className="text-lg font-semibold text-white ml-2">ERP</span>
        )}
      </div>

      {/* Divider */}
      {!collapsed && <hr className="border-gray-600 mb-4" />}

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <Link to={item.route} key={index}>
          <div
            className={`flex items-center py-3 px-4 rounded-lg transition-all duration-300 cursor-pointer ${
              location.pathname === item.route
                ? "bg-blue-500 text-white shadow-lg"
                : "hover:bg-gray-600 text-gray-300"
            }`}
          >
            <div className="text-lg">{item.icon}</div>
            {!collapsed && (
              <span className="ml-4 text-sm font-medium">{item.text}</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SideNavbar;