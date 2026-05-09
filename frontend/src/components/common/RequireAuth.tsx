import { getUserFromToken } from "@/utils/jwt";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const RequireAuth = ({ children, allowedRoles }: Props) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const roles = Array.isArray(user.roles) ? user.roles : [user.roles];

  // check role nếu có truyền allowedRoles
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = roles.some((role) =>
      allowedRoles.includes(role.toUpperCase()),
    );

    if (!hasRole) {
      return <Navigate to="/403" replace />;
    }
  }

  return children;
};

export default RequireAuth;
