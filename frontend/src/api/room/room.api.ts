import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types/api-response";
import type { Room, RoomListResponse, RoomStatus } from "@/types/room.types";

const BASE_URL = "/room";

export const roomApi = {
  // Get all rooms with pagination
  getAllRooms: async (page = 0, size = 10): Promise<ApiResponse<RoomListResponse>> => {
    const response = await axiosInstance.get<ApiResponse<RoomListResponse>>(
      `${BASE_URL}/list`,
      {
        params: { page, size },
      }
    );
    return response.data;
  },

  // Get rooms by building
  getRoomsByBuilding: async (
    buildingId: number,
    page = 0,
    size = 10
  ): Promise<ApiResponse<RoomListResponse>> => {
    const response = await axiosInstance.get<ApiResponse<RoomListResponse>>(
      `${BASE_URL}/building/${buildingId}`,
      {
        params: { page, size },
      }
    );
    return response.data;
  },

  // Get rooms by status
  getRoomsByStatus: async (
    status: RoomStatus,
    page = 0,
    size = 10
  ): Promise<ApiResponse<RoomListResponse>> => {
    const response = await axiosInstance.get<ApiResponse<RoomListResponse>>(
      `${BASE_URL}/status/${status}`,
      {
        params: { page, size },
      }
    );
    return response.data;
  },

  // Get room by id
  getRoomById: async (id: number): Promise<ApiResponse<Room>> => {
    const response = await axiosInstance.get<ApiResponse<Room>>(`${BASE_URL}/${id}`);
    return response.data;
  },
};
