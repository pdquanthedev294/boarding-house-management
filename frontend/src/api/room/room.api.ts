import api from "@/lib/axios";
import type {
  Room,
  RoomListResponse,
  RoomRequest,
  RoomStatus,
} from "@/types/room.types";
import type { ApiResponse } from "@/types/api-response";

import { API_ENDPOINTS } from "@/constants/endpoints";

export const roomApi = {
  getAllRooms: async (
    page = 0,
    size = 2,
  ): Promise<ApiResponse<RoomListResponse>> => {
    const response = await api.get<ApiResponse<RoomListResponse>>(
      API_ENDPOINTS.ROOM.LIST,
      { params: { page, size } },
    );
    return response.data;
  },

  getRoomsByBuilding: async (
    buildingId: number,
    page = 0,
    size = 2,
  ): Promise<ApiResponse<RoomListResponse>> => {
    const response = await api.get<ApiResponse<RoomListResponse>>(
      API_ENDPOINTS.ROOM.GET_BY_BUILDING(buildingId),
      { params: { page, size } },
    );
    return response.data;
  },

  getRoomsByStatus: async (
    status: RoomStatus,
    page = 0,
    size = 2,
  ): Promise<ApiResponse<RoomListResponse>> => {
    const response = await api.get<ApiResponse<RoomListResponse>>(
      API_ENDPOINTS.ROOM.GET_BY_STATUS(status),
      { params: { page, size } },
    );
    return response.data;
  },

  getRoomById: async (id: number): Promise<ApiResponse<Room>> => {
    const response = await api.get<ApiResponse<Room>>(API_ENDPOINTS.ROOM.GET_BY_ID(id));
    return response.data;
  },

  createRoom: async (data: RoomRequest): Promise<ApiResponse<Room>> => {
    const response = await api.post<ApiResponse<Room>>(
      API_ENDPOINTS.ROOM.CREATE,
      data,
    );
    return response.data;
  },

  updateRoom: async (
    id: number,
    data: RoomRequest,
  ): Promise<ApiResponse<Room>> => {
    const response = await api.put<ApiResponse<Room>>(
      API_ENDPOINTS.ROOM.UPDATE(id),
      data,
    );
    return response.data;
  },

  deleteRoom: async (id: number): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(
      API_ENDPOINTS.ROOM.DELETE(id),
    );
    return response.data;
  },

  uploadRoomImage: async (formData: FormData) => {
    const response = await api.post(API_ENDPOINTS.ROOM.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
