import { useState } from "react";
import { Outlet } from "react-router-dom";
import ExhibitorSidebar from "../components/Exhibitor/ExhibitorSidebar";
import ExhibitorHeader from "../components/Exhibitor/ExhibitorHeader";

const ExhibitorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <ExhibitorHeader
        headline={
          <h2 className="text-xl font-bold absolute left-5 hidden sm:block">
            Exhibitor Panel
          </h2>
        }
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Body */}
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 md:w-0 bg-base-300 transform transition-transform duration-300 sm:relative sm:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <ExhibitorSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 sm:ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ExhibitorLayout;
