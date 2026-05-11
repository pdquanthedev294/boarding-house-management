import { createSlice } from "@reduxjs/toolkit";

import type { AuthState } from "@/types/auth.types";

import {
  forgotPasswordThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  resendOtpThunk,
  resetPasswordThunk,
  verifyOtpThunk,
} from "./auth.thunk";

import { getAuthTokens } from "./auth.utils";

import {
  clearAuth,
  resetForgotPasswordState,
  setAuth,
  setError,
  setLoading,
} from "./auth.helpers";

const { accessToken, refreshToken } = getAuthTokens();

const initialState: AuthState = {
  user: null,
  accessToken,
  refreshToken,
  loading: false,
  error: null,

  forgotEmail: null,
  step: 1,
  otpExpire: 0,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },

    resetForgotFlow: resetForgotPasswordState,
  },

  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginThunk.pending, setLoading)
      .addCase(loginThunk.fulfilled, setAuth)
      .addCase(loginThunk.rejected, setError);

    // REGISTER
    builder
      .addCase(registerThunk.pending, setLoading)
      .addCase(registerThunk.fulfilled, setAuth)
      .addCase(registerThunk.rejected, setError);

    // LOGOUT
    builder
      .addCase(logoutThunk.pending, setLoading)
      .addCase(logoutThunk.fulfilled, clearAuth)
      .addCase(logoutThunk.rejected, (state, action) => {
        clearAuth(state);
        state.error = action.payload || "Logout failed";
      });

    // SEND OTP
    builder
      .addCase(forgotPasswordThunk.pending, setLoading)
      .addCase(
        forgotPasswordThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.forgotEmail = action.meta.arg.email;
          state.step = 2;
          state.otpExpire = Date.now() + 600000;
        }
      )
      .addCase(forgotPasswordThunk.rejected, setError);

    // VERIFY OTP
    builder
      .addCase(verifyOtpThunk.pending, setLoading)
      .addCase(verifyOtpThunk.fulfilled, (state) => {
        state.loading = false;
        state.step = 3;
      })
      .addCase(verifyOtpThunk.rejected, setError);

    // RESET PASSWORD
    builder
      .addCase(resetPasswordThunk.pending, setLoading)
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.loading = false;
        resetForgotPasswordState(state);
      })
      .addCase(resetPasswordThunk.rejected, setError);

    // RESEND OTP
    builder
      .addCase(resendOtpThunk.pending, setLoading)
      .addCase(resendOtpThunk.fulfilled, (state) => {
        state.loading = false;
        state.otpExpire = Date.now() + 600000;
      })
      .addCase(resendOtpThunk.rejected, setError);
  },
});

export const {
  setStep,
  resetForgotFlow,
} = authSlice.actions;

export default authSlice.reducer;