import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ExhibitorProtectedRoutes = () => {
  const { userData } = useSelector((state) => state.user);
  
  if (!userData || userData.role !== "exhibitor") {
    return <Navigate to="/exhibitor/login" />;
  }

  return <Outlet />;
};
