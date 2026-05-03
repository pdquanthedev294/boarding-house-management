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

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
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

    resetForgotFlow: (state) => {
      state.step = 1;
      state.forgotEmail = null;
      state.otpExpire = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken || null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // REGISTER
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      })

      // LOGOUT
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
      })

      // SEND EMAIL
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotEmail = action.meta.arg.email;
        state.step = 2;

        // OTP hết hạn sau 60s
        state.otpExpire = Date.now() + 60000;
      })

      // VERIFY OTP
      .addCase(verifyOtpThunk.fulfilled, (state) => {
        state.loading = false;
        state.step = 3;
      })

      // RESET PASSWORD
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.step = 1;
        state.forgotEmail = null;
      })

      // RESEND OTP
      .addCase(resendOtpThunk.fulfilled, (state) => {
        state.otpExpire = Date.now() + 60000;
      });
  },
});

export default authSlice.reducer;
