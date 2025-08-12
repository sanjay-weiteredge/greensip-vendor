import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../components/store";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useUser();
  const location = useLocation();

  const isAuthenticated = Boolean(userInfo) || Boolean(localStorage.getItem("userToken"));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children || <Outlet />;
};

export default PrivateRoute;
