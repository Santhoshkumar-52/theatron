// Layouts/MainLayout.jsx
import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import { useGlobalStore } from "../globalstore.js";
import "../Styles/topbar.css";
// icons
import { FaBell, FaWrench } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default function RouterLayout() {
  const date = new Date().getFullYear();
  const loggedUser = useGlobalStore((state) => state.user);
  console.log(loggedUser);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className=" w-[100%] outlet">
        <div className="h-14 flex justify-between topbar">
          <h4 className="lg:w-100 userProfile mx-3 text-md font-medium flex items-center">
            Welcome, {loggedUser.staffname} {`(${loggedUser.role})`}{" "}
            <FaWrench className="ml-3" />
          </h4>
          <h1 className="lg:w-40 w-20 userProfile  flex items-center justify-evenly notifications">
            <FaBell className="lg:text-2xl cursor-pointer" />
            <IoIosMail className="lg:text-2xl cursor-pointer" />
          </h1>
        </div>
        <div className="h-[90vh] overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
        {/* <div className="footer fixed bottom-0 h-12 pl-10 pt-3 text-sm">
         © {date} Theatron. All rights reserved. | <a target="_self"href="www.google.com">Privacy Policy</a>
        </div> */}
      </div>
    </div>
  );
}
