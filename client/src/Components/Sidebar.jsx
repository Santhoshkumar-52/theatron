import React, { useState } from "react";
import {
  FaHome,
  FaTicketAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { TbBuildingPlus } from "react-icons/tb";

import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalStore } from "../globalstore";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    // { name: "Bookings", icon: <FaTicketAlt />, path: "/bookings" },
    // { name: "Staff", icon: <FaUsers />, path: "/staff" },
    { name: "New Screen", icon: <TbBuildingPlus />, path: "/newscreen" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.clear("loggedUser");
    useGlobalStore.getState().logout();
    useNavigate("/login");
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`h-screen  bg-[#1f1f1f] text-white flex flex-col transition-all duration-300
        ${isOpen ? "w-50" : "w-15"}`}
      >
        {/* Top: Logo + Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-[#2e2e2e]">
          {isOpen && <span className="font-bold text-lg">THEATRON</span>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-[#2e2e2e] rounded"
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
                `flex items-center gap-3 p-3 hover:bg-[#2e2e2e] rounded mx-2 my-1 ${
                  isActive ? "bg-[#2e2e2e]" : ""
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
          <button
            className="flex items-center gap-3 w-full hover:bg-[#2e2e2e] p-2 rounded"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Page Content */}
    </div>
  );
}
