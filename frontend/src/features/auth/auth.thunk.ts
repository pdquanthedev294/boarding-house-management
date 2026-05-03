import {
  forgotPasswordService,
  loginService,
  logoutService,
  registerService,
  resetPasswordService,
  verifyOtpService,
} from "@/services/auth.service";
import type {
  LoginRequest,
  AuthResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
} from "@/types/auth.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuthTokens, setAuthTokens } from "./auth.utils";

// LOGIN
export const loginThunk = createAsyncThunk<
  AuthResponse,
  LoginRequest,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  const res = await loginService(data);

  if (res.status >= 400) {
    return rejectWithValue(res.message || "Login failed");
  }

  const token = res.data.accessToken;
  const refreshToken = res.data.refreshToken || null;
  setAuthTokens(token, refreshToken);

  return {
    accessToken: token,
    refreshToken,
    user: {
      email: data.email,
    },
  };
});

// REGISTER
export const registerThunk = createAsyncThunk<
  AuthResponse,
  RegisterRequest,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  const res = await registerService(data);

  if (res.status >= 400) {
    return rejectWithValue(res.message || "Register failed");
  }

  const token = res.data?.accessToken;
  const refreshToken = res.data?.refreshToken || null;

  if (token) {
    setAuthTokens(token, refreshToken);
  }

  return {
    accessToken: token ?? "",
    refreshToken,
    user: {
      email: data.email,
    },
  };
});

// LOGOUT
export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await logoutService();

    if (res.status >= 400) {
      return rejectWithValue(res.message || "Logout failed");
    }
  } catch {
    return rejectWithValue("Logout failed");
  } finally {
    clearAuthTokens();
  }
});

// gửi email
export const forgotPasswordThunk = createAsyncThunk<
  string,
  ForgotPasswordRequest,
  { rejectValue: string }
>("auth/forgot-password", async (data, { rejectWithValue }) => {
  const res = await forgotPasswordService(data);

  if (res.status >= 400) {
    return rejectWithValue(res.message || "Forgot password failed");
  }

  return res.message;
});

// verify OTP
export const verifyOtpThunk = createAsyncThunk<
  string,
  VerifyOtpRequest,
  { rejectValue: string }
>("auth/verify-otp", async (data, { rejectWithValue }) => {
  const res = await verifyOtpService(data);

  if (res.status >= 400) {
    return rejectWithValue(res.message || "Verify OTP failed");
  }

  return res.message;
});

// reset password
export const resetPasswordThunk = createAsyncThunk<
  string,
  ResetPasswordRequest,
  { rejectValue: string }
>("auth/reset-password", async (data, { rejectWithValue }) => {
  const res = await resetPasswordService(data);

  if (res.status >= 400) {
    return rejectWithValue(res.message || "Reset password failed");
  }

  return res.message;
});

// resend OTP
export const resendOtpThunk = createAsyncThunk<
  string,
  { email: string },
  { rejectValue: string }
>("auth/resend-otp", async (data, { rejectWithValue }) => {
  const res = await forgotPasswordService(data);

  if (res.status >= 400) {
    return rejectWithValue(res.message || "Resend failed");
  }

  return res.message;
});