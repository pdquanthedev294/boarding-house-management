import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  email: string;
  roles: string[];
  exp?: number;
};

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

    if (!payload.exp) return false;

    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const hasRole = (roles: string[], role: string): boolean => {
  return roles.includes(role.toUpperCase());
};

export const hasPermission = (roles: string[], permission: string): boolean => {
  return roles.includes(permission.toUpperCase());
};

export const getRedirectPath = (): string => {

  const user = getUserFromToken();

  if (!user) {
    return "/login";
  }

  if (
    hasRole(user.roles, "ROLE_SYSTEM_ADMIN")
  ) {
    return "/system-admin";
  }

  if (
    hasRole(user.roles, "ROLE_ADMIN")
  ) {
    return "/admin/dashboard";
  }

  return "/dashboard";
};