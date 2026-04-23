import loginService from "@/services/auth.service";
import type {
  LoginRequest,
  AuthResponse,
} from "@/types/auth.types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk<AuthResponse, LoginRequest, { rejectValue: string }>(
  "auth/login",
  async (data, { rejectWithValue }) => {
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
        (error as { response?: { data?: { message?: string } } }).response?.data?.message || "Login failed"
      );
    }
  }
);
