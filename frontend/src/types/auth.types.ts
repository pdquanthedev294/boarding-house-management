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
}