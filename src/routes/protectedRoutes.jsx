import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectRoutes = () => {
  const { isUserAuth, role } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuth) {
    
      navigate("/", { replace: true });
    } else if (role === "exhibitor") {
      
      navigate("/exhibitor/dashboard", { replace: true });
    } else if (role === "admin") {
      
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isUserAuth, role, navigate]);

  return role === "user" ? <Outlet /> : null; 
};
