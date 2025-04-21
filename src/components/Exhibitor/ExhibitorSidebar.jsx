import { NavLink } from "react-router-dom";

const ExhibitorSidebar = ({onClose}) => {
  const links = [
    { path: "/exhibitor/dashboard", label: "Dashboard" },
    { path: "/exhibitor/theaters", label: "Manage Theaters" },
    { path: "/exhibitor/schedule", label: "Show Scheduling" },
    { path: "/exhibitor/shows-history", label: "Shows History" },
    { path: "/exhibitor/bookings", label: "Booking Management" },
    { path: "/exhibitor/reports", label: "Revenue Reports" },
    { path: "/exhibitor/feedback", label: "Customer Feedback" },
    { path: "/exhibitor/settings", label: "Profile Settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-base-300 text-base-content shadow-lg p-4 z-50 pt-26">
      
      <nav className="flex flex-col gap-3">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-semibold"
                : "hover:text-red-300"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default ExhibitorSidebar;
