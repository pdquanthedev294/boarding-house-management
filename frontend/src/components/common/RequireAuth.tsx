import { Navigate, useLocation } from "react-router-dom";
import { isTokenValid } from "@/utils/jwt";
import type { ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();

  if (!isTokenValid()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
