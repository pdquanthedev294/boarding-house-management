import { authApi } from "@/api/auth/auth.api";
import type { LoginRequest, LoginApiResponse } from "@/types/auth.types";

const loginService = async (data: LoginRequest): Promise<LoginApiResponse> => {
  return await authApi.login(data);
};

export default loginService;