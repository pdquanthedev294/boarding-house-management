import api from "@/lib/axios";
import type {
  LoginRequest,
  LoginApiResponse,
  RegisterApiResponse,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
  ForgotPasswordRequest,
} from "@/types/auth.types";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginApiResponse> => {
    const res = await api.post("/auth/access-token", data);
    return res.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterApiResponse> => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  logout: async (): Promise<void> => {
    const res = await api.post("/auth/logout");
    return res.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest) => {
    const res = await api.post("/auth/forgot-password", data);
    return res.data;
  },

  verifyOtp: async (data: VerifyOtpRequest) => {
    const res = await api.post("/auth/verify-otp", data);
    return res.data;
  },

  resetPassword: async (data: ResetPasswordRequest) => {
    const res = await api.post("/auth/reset-password", data);
    return res.data;
  },
};
