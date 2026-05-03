import { authApi } from "@/api/auth/auth.api";
import type {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
  ForgotPasswordRequest,
} from "@/types/auth.types";
import type { ApiResponse } from "@/types/api-response";

type TokenResponse = {
  accessToken: string;
  refreshToken?: string;
};

export const loginService = async (
  data: LoginRequest
): Promise<ApiResponse<TokenResponse>> => {
  const res = await authApi.login(data);
  return res.data;
};

export const refreshTokenService = async (
  refreshToken: string
): Promise<ApiResponse<TokenResponse>> => {
  const res = await authApi.refreshToken(refreshToken);
  return res.data;
};

export const registerService = async (
  data: RegisterRequest
): Promise<ApiResponse<TokenResponse>> => {
  const res = await authApi.register(data);
  return res.data;
};

export const logoutService = async (): Promise<ApiResponse<null>> => {
  const res = await authApi.logout();
  return res.data;
};

export const forgotPasswordService = async (
  data: ForgotPasswordRequest
): Promise<ApiResponse<null>> => {
  const res = await authApi.forgotPassword(data);
  return res.data;
};

export const verifyOtpService = async (
  data: VerifyOtpRequest
): Promise<ApiResponse<null>> => {
  const res = await authApi.verifyOtp(data);
  return res.data;
};

export const resetPasswordService = async (
  data: ResetPasswordRequest
): Promise<ApiResponse<null>> => {
  const res = await authApi.resetPassword(data);
  return res.data;
};