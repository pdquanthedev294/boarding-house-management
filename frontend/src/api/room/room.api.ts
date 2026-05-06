import api from "@/lib/axios";
import type {
  Room,
  RoomListResponse,
  RoomRequest,
  RoomStatus,
} from "@/types/room.types";
import type { ApiResponse } from "@/types/api-response";

const BASE_URL = "/room";

export const roomApi = {
  getAllRooms: async (
    page = 0,
    size = 10
  ): Promise<ApiResponse<RoomListResponse>> => {
    const response = await api.get<ApiResponse<RoomListResponse>>(
      `${BASE_URL}/list`,
      { params: { page, size } }
    );
    return response.data;
  },

  getRoomsByBuilding: async (
    buildingId: number,
    page = 0,
    size = 10
  ): Promise<ApiResponse<RoomListResponse>> => {
    const response = await api.get<ApiResponse<RoomListResponse>>(
      `${BASE_URL}/building/${buildingId}`,
      { params: { page, size } }
    );
    return response.data;
  },

  getRoomsByStatus: async (
    status: RoomStatus,
    page = 0,
    size = 10
  ): Promise<ApiResponse<RoomListResponse>> => {
    const response = await api.get<ApiResponse<RoomListResponse>>(
      `${BASE_URL}/status/${status}`,
      { params: { page, size } }
    );
    return response.data;
  },

  getRoomById: async (id: number): Promise<ApiResponse<Room>> => {
    const response = await api.get<ApiResponse<Room>>(
      `${BASE_URL}/${id}`
    );
    return response.data;
  },

  createRoom: async (
    data: RoomRequest
  ): Promise<ApiResponse<Room>> => {
    const response = await api.post<ApiResponse<Room>>(
      `${BASE_URL}/create`,
      data
    );
    return response.data;
  },

  updateRoom: async (
    id: number,
    data: RoomRequest
  ): Promise<ApiResponse<Room>> => {
    const response = await api.put<ApiResponse<Room>>(
      `${BASE_URL}/update/${id}`,
      data
    );
    return response.data;
  },

  deleteRoom: async (id: number): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(
      `${BASE_URL}/delete/${id}`
    );
    return response.data;
  },
};