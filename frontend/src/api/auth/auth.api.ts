import api from "@/lib/axios";
import type {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
  ForgotPasswordRequest,
} from "@/types/auth.types";
import type { ApiResponse } from "@/types/api-response";

// response data
type TokenResponse = {
  accessToken: string;
  refreshToken?: string;
};

export const authApi = {
  login: (data: LoginRequest) =>
    api.post<ApiResponse<TokenResponse>>("/auth/access-token", data),

  register: (data: RegisterRequest) =>
    api.post<ApiResponse<TokenResponse>>("/auth/register", data),

  logout: () =>
    api.post<ApiResponse<null>>("/auth/logout"),

  forgotPassword: (data: ForgotPasswordRequest) =>
    api.post<ApiResponse<null>>("/auth/forgot-password", data),

  verifyOtp: (data: VerifyOtpRequest) =>
    api.post<ApiResponse<null>>("/auth/verify-otp", data),

  resetPassword: (data: ResetPasswordRequest) =>
    api.post<ApiResponse<null>>("/auth/reset-password", data),
};