// Login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string | null;
  };
}

export interface AuthResponse {
  accessToken: string;
  user: {
    email: string;
  };
}

export interface AuthState {
  user: AuthResponse["user"] | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;

  forgotEmail: string | null;
  step: 1 | 2 | 3;
  otpExpire: number;
}

// Register
export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterApiResponse {
  status: number;
  message: string;
  data: {
    id: string;
    email: string;
  };
}

// Forgot Password
export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
  confirmPassword: string;
}