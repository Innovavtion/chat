import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { type RootState } from "@/store/store";
import { useSelector } from "react-redux";

export type AuthGuardProps = {
  redirectPath: string;
  guardType: "auth" | "unauth";
};

export const AuthGuard: React.FC<AuthGuardProps> = ({
  redirectPath,
  guardType,
}) => {
  const location = useLocation();
  const authData = useSelector((state: RootState) => state.auth);

  if (
    authData.auth &&
    guardType === "unauth" &&
    authData.status === "success"
  ) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (!authData.auth && guardType === "auth" && authData.status === "failed") {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
