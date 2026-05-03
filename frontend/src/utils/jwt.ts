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
    if (!payload?.exp) return false;
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getRedirectPath = (): string => {
  const user = getUserFromToken();

  console.log("User from token:", user);
  
  if (!user) return "/login";

  if (user.roles.includes("ROLE_SYSTEM_ADMIN")) {
    return "/system-admin";
  }

  if (user.roles.includes("ROLE_ADMIN")) {
    return "/admin/dashboard";
  }

  return "/dashboard";
};
