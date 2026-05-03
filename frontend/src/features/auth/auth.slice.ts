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
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken || null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      })

      // LOGOUT
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload || "Logout failed";
      })

      // SEND EMAIL
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotEmail = action.meta.arg.email;
        state.step = 2;
        state.otpExpire = Date.now() + 600000; // 10 phút
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gửi mã OTP thất bại";
      })

      // VERIFY OTP
      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state) => {
        state.loading = false;
        state.step = 3;
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Xác thực OTP thất bại";
      })

      // RESET PASSWORD
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.step = 1;
        state.forgotEmail = null;
        state.error = null;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đặt lại mật khẩu thất bại";
      })

      // RESEND OTP
      .addCase(resendOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtpThunk.fulfilled, (state) => {
        state.loading = false;
        state.otpExpire = Date.now() + 600000; // 10 phút
      })
      .addCase(resendOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gửi lại OTP thất bại";
      });
  },
});

export default authSlice.reducer;
