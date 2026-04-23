import { loginService, logoutService, registerService } from "@/services/auth.service";
import type { LoginRequest, AuthResponse, RegisterRequest } from "@/types/auth.types";
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
    return rejectWithValue(
      (error as { response?: { data?: { message?: string } } }).response?.data
        ?.message || "Login failed",
    );
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
    return rejectWithValue(
      (error as { response?: { data?: { message?: string } } }).response?.data
        ?.message || "Register failed",
    );
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
    return rejectWithValue(
      (error as { response?: { data?: { message?: string } } }).response?.data
        ?.message || "Logout failed",
    );
  }
});
