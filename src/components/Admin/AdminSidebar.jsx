import { NavLink } from "react-router-dom";

const AdminSidebar = ({onClose}) => {
  const links = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/users", label: "Manage Users" },
    { path: "/admin/exhibitors", label: "Manage Exhibitors" },
    { path: "/admin/movies", label: "Manage Movies" },
    { path: "/admin/theaters", label: "Manage Theaters" },
    { path: "/admin/carousel", label: "Manage Carousel images" },
    { path: "/admin/notifications", label: "Manage Notifications" },
    { path: "/admin/reports", label: "Reports" },
    { path: "/admin/settings", label: "Settings" },
    { path: "/admin/profile", label: "Admin Profile " },
  ];

  return (
    <aside className="w-64 h-screen bg-base-200 text-base-content shadow-lg p-4 z-50 pt-26">
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

export default AdminSidebar;
