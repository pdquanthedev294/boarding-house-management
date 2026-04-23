import api from "@/lib/axios";
import type { LoginRequest, LoginApiResponse } from "@/types/auth.types";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginApiResponse> => {
    const res = await api.post("/auth/access-token", data);
    return res.data;
  },
};