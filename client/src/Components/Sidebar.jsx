import React, { useState } from "react";
import {
  FaHome,
  FaTicketAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    // { name: "Bookings", icon: <FaTicketAlt />, path: "/bookings" },
    // { name: "Staff", icon: <FaUsers />, path: "/staff" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-800 text-white flex flex-col transition-all duration-300
        ${isOpen ? "w-50" : "w-15"}`}
      >
        {/* Top: Logo + Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && <span className="font-bold text-lg">THEATRON</span>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-700 rounded"
          >
            <FaBars />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 hover:bg-gray-700 rounded mx-2 my-1 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700 mt-auto">
          <button className="flex items-center gap-3 w-full hover:bg-gray-700 p-2 rounded">
            <FaSignOutAlt />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Page Content */}

    </div>
  );
}
