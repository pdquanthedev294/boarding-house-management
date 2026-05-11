import api from "@/lib/axios";
import type {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
  ForgotPasswordRequest,
  TokenResponse,
} from "@/types/auth.types";
import type { ApiResponse } from "@/types/api-response";

import { API_ENDPOINTS } from "@/constants/endpoints";

export const authApi = {
  login: (data: LoginRequest) =>
    api.post<ApiResponse<TokenResponse>>(API_ENDPOINTS.AUTH.LOGIN, data),

  refreshToken: (refreshToken: string) =>
    api.post<ApiResponse<TokenResponse>>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken }),

  register: (data: RegisterRequest) =>
    api.post<ApiResponse<TokenResponse>>(API_ENDPOINTS.AUTH.REGISTER, data),

  logout: () =>
    api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.LOGOUT),

  forgotPassword: (data: ForgotPasswordRequest) =>
    api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data),

  verifyOtp: (data: VerifyOtpRequest) =>
    api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.VERIFY_OTP, data),

  resetPassword: (data: ResetPasswordRequest) =>
    api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data),
};