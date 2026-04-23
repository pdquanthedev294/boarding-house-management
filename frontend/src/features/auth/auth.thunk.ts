import axios from "axios";
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

// LOGIN
export const loginThunk = createAsyncThunk<
  AuthResponse,
  LoginRequest,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await loginService(data);

    const token = res.data.accessToken;

    localStorage.setItem("token", token);

    return {
      accessToken: token,
      user: {
        email: data.email,
      },
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
    return rejectWithValue("Something went wrong");
  }
});

// REGISTER
export const registerThunk = createAsyncThunk<
  string, // chỉ cần message
  RegisterRequest,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await registerService(data);

    return res.message || "Register success";
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Register failed");
    }
    return rejectWithValue("Something went wrong");
  }
});

// LOGOUT
export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logoutService();
    localStorage.removeItem("token");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
    return rejectWithValue("Something went wrong");
  }
});

// gửi email
export const forgotPasswordThunk = createAsyncThunk<
  string,
  ForgotPasswordRequest,
  { rejectValue: string }
>("auth/forgot-password", async (data, { rejectWithValue }) => {
  try {
    const res = await forgotPasswordService(data);
    return res.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Forgot password failed");
    }
    return rejectWithValue("Something went wrong");
  }
});

// verify OTP
export const verifyOtpThunk = createAsyncThunk<
  string,
  VerifyOtpRequest,
  { rejectValue: string }
>("auth/verify-otp", async (data, { rejectWithValue }) => {
  try {
    const res = await verifyOtpService(data);
    return res.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Verify OTP failed");
    }
    return rejectWithValue("Something went wrong");
  }
});

// reset password
export const resetPasswordThunk = createAsyncThunk<
  string,
  ResetPasswordRequest,
  { rejectValue: string }
>("auth/reset-password", async (data, { rejectWithValue }) => {
  try {
    const res = await resetPasswordService(data);
    return res.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Reset password failed");
    }
    return rejectWithValue("Something went wrong");
  }
});
// resend OTP
export const resendOtpThunk = createAsyncThunk<
  string,
  { email: string },
  { rejectValue: string }
>("auth/resend-otp", async (data, { rejectWithValue }) => {
  try {
    const res = await forgotPasswordService(data);
    return res.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Resend failed");
    }
    return rejectWithValue("Something went wrong");
  }
});
