import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminProtectedRoutes = () => {
  const { userData } = useSelector((state) => state.user);
  
  if (!userData || userData.role !== "admin") {
    return <Navigate to="/admin/login" />;  
  }

  return <Outlet />;  
};
