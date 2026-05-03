import type { ApiResponse } from "@/types/api-response";

export const TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refreshToken";

export const setAuthTokens = (accessToken: string, refreshToken?: string | null) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const clearAuthTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getAuthTokens = () => ({
  accessToken: localStorage.getItem(TOKEN_KEY),
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
});

export const ensureApiSuccess = <T>(res: ApiResponse<T>, fallbackMessage: string) => {
  if (res.status >= 400) {
    throw new Error(res.message || fallbackMessage);
  }

  return res.data;
};
