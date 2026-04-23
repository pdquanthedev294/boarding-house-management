import { authApi } from "@/api/auth/auth.api";
import type { LoginRequest, LoginApiResponse, RegisterRequest } from "@/types/auth.types";

export const loginService = async (data: LoginRequest): Promise<LoginApiResponse> => {
  return await authApi.login(data);
};

export const registerService = async (data: RegisterRequest) => {
  return await authApi.register(data);
};

export const logoutService = async (): Promise<void> => {
  return await authApi.logout();
};
