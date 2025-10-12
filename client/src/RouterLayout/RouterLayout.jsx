// Layouts/MainLayout.jsx
import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

export default function RouterLayout() {
  return (
    <div className="flex h-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="border w-[100%]">
        <div className="h-14">topbar</div>
          <Outlet />
      </div>
    </div>
  );
}
