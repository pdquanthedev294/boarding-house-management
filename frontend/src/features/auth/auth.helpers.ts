import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  AuthResponse,
  AuthState,
} from "@/types/auth.types";

export const setLoading = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};

export const setError = (state: AuthState, action: PayloadAction<string | undefined>) => {
  state.loading = false;
  state.error = action.payload || "Something went wrong";
};

export const setAuth = (state: AuthState, action: PayloadAction<AuthResponse>) => {
  state.loading = false;

  state.user = action.payload.user;
  state.accessToken = action.payload.accessToken;
  state.refreshToken = action.payload.refreshToken || null;
};

export const clearAuth = (state: AuthState) => {
  state.loading = false;

  state.user = null;
  state.accessToken = null;
  state.refreshToken = null;
};

export const resetForgotPasswordState = (state: AuthState) => {
  state.step = 1;
  state.forgotEmail = null;
  state.otpExpire = 0;
};