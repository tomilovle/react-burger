import React, { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../services/rootReducer";
import { useAppSelector } from "../hooks/hook";

interface ProtectedRouteElementProps {
  children: ReactNode;
  forAuth?: boolean;
}

const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({
  children,
  forAuth = false,
}) => {
  const userInfo = useAppSelector((state: RootState) => state.user.userInfo);
  const location = useLocation();

  if (forAuth && userInfo) {
    return <Navigate to="/" />;
  }
  if (!forAuth && !userInfo) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRouteElement;
