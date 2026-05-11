export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/access-token",
    REFRESH_TOKEN: "/auth/refresh-token",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
  },

  ROOM: {
    LIST: "/room/list",

    GET_BY_ID: (id: number | string) => `/room/${id}`,

    GET_BY_BUILDING: (buildingId: number | string) =>
      `/room/building/${buildingId}`,

    GET_BY_STATUS: (status: string) => `/room/status/${status}`,

    CREATE: "/room/create",

    UPDATE: (id: number | string) => `/room/update/${id}`,

    DELETE: (id: number | string) => `/room/delete/${id}`,

    UPLOAD_IMAGE: "/room/upload",
  },
} as const;
