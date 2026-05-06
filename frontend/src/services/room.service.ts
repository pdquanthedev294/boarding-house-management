import { roomApi } from "@/api/room/room.api";
import type { ApiResponse } from "@/types/api-response";
import type { Room, RoomListResponse, RoomRequest, RoomStatus } from "@/types/room.types";

export const roomListService = async (page = 0, size = 10): Promise<RoomListResponse> => {
  const response = await roomApi.getAllRooms(page, size);
  if (!response.data) throw new Error(response.message || "Lấy danh sách phòng thất bại");
  return response.data;
};

export const roomByBuildingService = async (buildingId: number, page = 0, size = 10): Promise<RoomListResponse> => {
  const response = await roomApi.getRoomsByBuilding(buildingId, page, size);
  if (!response.data) throw new Error(response.message || "Lấy danh sách phòng thất bại");
  return response.data;
};

export const roomByStatusService = async (status: RoomStatus, page = 0, size = 10): Promise<RoomListResponse> => {
  const response = await roomApi.getRoomsByStatus(status, page, size);
  if (!response.data) throw new Error(response.message || "Lấy danh sách phòng thất bại");
  return response.data;
};

export const roomDetailService = async (id: number): Promise<ApiResponse<Room>> => {
  const response = await roomApi.getRoomById(id);
  if (!response.data) throw new Error(response.message || "Lấy chi tiết phòng thất bại");
  return response;
};

export const createRoomService = async (data: RoomRequest): Promise<Room> => {
  const response = await roomApi.createRoom(data);
  if (!response.data) throw new Error(response.message || "Tạo phòng thất bại");
  return response.data;
};

export const updateRoomService = async (id: number, data: RoomRequest): Promise<Room> => {
  const response = await roomApi.updateRoom(id, data);
  if (!response.data) throw new Error(response.message || "Cập nhật phòng thất bại");
  return response.data;
};

export const deleteRoomService = async (id: number): Promise<void> => {
  await roomApi.deleteRoom(id);
};