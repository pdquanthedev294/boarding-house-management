import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  email: string;
  roles: string[] | string;
  exp?: number;
};

const normalizeRoles = (roles: JwtPayload["roles"]): string[] => {
  if (!roles) return [];
  return Array.isArray(roles) ? roles : [roles];
};

const isAdminRole = (roles: string[]): boolean =>
  roles.some((role) => ["ROLE_ADMIN", "ADMIN"].includes(role.toUpperCase()));

const isSystemAdminRole = (roles: string[]): boolean =>
  roles.some((role) => ["ROLE_SYSTEM_ADMIN", "SYSTEM_ADMIN"].includes(role.toUpperCase()));

export const getUserFromToken = (): JwtPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = jwtDecode<JwtPayload>(token);
    if (!payload?.exp) return false;
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getRedirectPath = (): string => {
  const user = getUserFromToken();
  if (!user) return "/login";

  const roles = normalizeRoles(user.roles);

  console.log("User roles:", roles);

  if (isSystemAdminRole(roles)) {
    return "/system-admin";
  }

  if (isAdminRole(roles)) {
    return "/admin/dashboard";
  }

  return "/dashboard";
};
