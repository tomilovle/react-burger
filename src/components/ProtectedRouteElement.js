import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteElement = ({ children, forAuth = false }) => {
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();

  if (forAuth && userInfo) {
    return <Navigate to="/" />;
  }

  if (!forAuth && !userInfo) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRouteElement;
