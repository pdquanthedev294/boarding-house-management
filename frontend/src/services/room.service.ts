import { roomApi } from "@/api/room/room.api";
import type { ApiResponse } from "@/types/api-response";
import type { Room, RoomListResponse, RoomStatus } from "@/types/room.types";

export const roomListService = async (page = 0, size = 10): Promise<RoomListResponse> => {
  const response = await roomApi.getAllRooms(page, size);
  if (!response.data) {
    throw new Error(response.message || "Lấy danh sách phòng thất bại");
  }
  return response.data;
};

export const roomByBuildingService = async (
  buildingId: number,
  page = 0,
  size = 10
): Promise<RoomListResponse> => {
  const response = await roomApi.getRoomsByBuilding(buildingId, page, size);
  if (!response.data) {
    throw new Error(response.message || "Lấy danh sách phòng thất bại");
  }
  return response.data;
};

export const roomByStatusService = async (
  status: RoomStatus,
  page = 0,
  size = 10
): Promise<RoomListResponse> => {
  const response = await roomApi.getRoomsByStatus(status, page, size);
  if (!response.data) {
    throw new Error(response.message || "Lấy danh sách phòng thất bại");
  }
  return response.data;
};

export const roomDetailService = async (id: number): Promise<ApiResponse<Room>> => {
  const response = await roomApi.getRoomById(id);
  if (!response.data) {
    throw new Error(response.message || "Lấy chi tiết phòng thất bại");
  }
  return response;
};
