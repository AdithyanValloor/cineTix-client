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

      {/* Layout Body */}
      <div className="flex flex-1 pt-24 lg:pt-20 relative">
        {/* Sidebar */}
        <aside
          className={`sticky top-20 h-[calc(100vh-5rem)] w-64 z-40 transition-transform duration-300 bg-base-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
        >

          <ExhibitorSidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ExhibitorLayout;
