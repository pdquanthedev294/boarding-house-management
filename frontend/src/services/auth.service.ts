import { authApi } from "@/api/auth/auth.api";
import type { LoginRequest, LoginApiResponse, RegisterRequest, ResetPasswordRequest, VerifyOtpRequest, ForgotPasswordRequest } from "@/types/auth.types";

export const loginService = async (data: LoginRequest): Promise<LoginApiResponse> => {
  return await authApi.login(data);
};

export const registerService = async (data: RegisterRequest) => {
  return await authApi.register(data);
};

export const logoutService = async (): Promise<void> => {
  return await authApi.logout();
};


export const forgotPasswordService = (data: ForgotPasswordRequest) => {
  return authApi.forgotPassword(data);
};

export const verifyOtpService = (data: VerifyOtpRequest) => {
  return authApi.verifyOtp(data);
};

export const resetPasswordService = (data: ResetPasswordRequest) => {
  return authApi.resetPassword(data);
};