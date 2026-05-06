import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  roomListService,
  roomByBuildingService,
  roomByStatusService,
  roomDetailService,
  createRoomService,
  updateRoomService,
  deleteRoomService,
} from "@/services/room.service";
import type { RoomRequest, RoomStatus } from "@/types/room.types";

export const fetchRoomsThunk = createAsyncThunk(
  "room/fetchRooms",
  async ({ page = 0, size = 10 }: { page?: number; size?: number }, { rejectWithValue }) => {
    try {
      return await roomListService(page, size);
    } catch (error: any) {
      return rejectWithValue(error.message || "Lấy danh sách phòng thất bại");
    }
  }
);

export const fetchRoomsByBuildingThunk = createAsyncThunk(
  "room/fetchByBuilding",
  async ({ buildingId, page = 0, size = 10 }: { buildingId: number; page?: number; size?: number }, { rejectWithValue }) => {
    try {
      return await roomByBuildingService(buildingId, page, size);
    } catch (error: any) {
      return rejectWithValue(error.message || "Lấy danh sách phòng thất bại");
    }
  }
);

export const fetchRoomsByStatusThunk = createAsyncThunk(
  "room/fetchByStatus",
  async ({ status, page = 0, size = 10 }: { status: RoomStatus; page?: number; size?: number }, { rejectWithValue }) => {
    try {
      return await roomByStatusService(status, page, size);
    } catch (error: any) {
      return rejectWithValue(error.message || "Lấy danh sách phòng thất bại");
    }
  }
);

export const fetchRoomDetailThunk = createAsyncThunk(
  "room/fetchDetail",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await roomDetailService(id);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Lấy chi tiết phòng thất bại");
    }
  }
);

export const createRoomThunk = createAsyncThunk(
  "room/create",
  async (data: RoomRequest, { rejectWithValue }) => {
    try {
      return await createRoomService(data);
    } catch (error: any) {
      return rejectWithValue(error.message || "Tạo phòng thất bại");
    }
  }
);

export const updateRoomThunk = createAsyncThunk(
  "room/update",
  async ({ id, data }: { id: number; data: RoomRequest }, { rejectWithValue }) => {
    try {
      return await updateRoomService(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message || "Cập nhật phòng thất bại");
    }
  }
);

export const deleteRoomThunk = createAsyncThunk(
  "room/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteRoomService(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Xóa phòng thất bại");
    }
  }
);