import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  roomListService,
  roomByBuildingService,
  roomByStatusService,
  roomDetailService,
} from "@/services/room.service";
import type { RoomStatus } from "@/types/room.types";

export const fetchRoomsThunk = createAsyncThunk(
  "room/fetchRooms",
  async (
    { page = 0, size = 10 }: { page?: number; size?: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await roomListService(page, size);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Lấy danh sách phòng thất bại"
      );
    }
  }
);

export const fetchRoomsByBuildingThunk = createAsyncThunk(
  "room/fetchByBuilding",
  async (
    {
      buildingId,
      page = 0,
      size = 10,
    }: { buildingId: number; page?: number; size?: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await roomByBuildingService(buildingId, page, size);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Lấy danh sách phòng thất bại"
      );
    }
  }
);

export const fetchRoomsByStatusThunk = createAsyncThunk(
  "room/fetchByStatus",
  async (
    {
      status,
      page = 0,
      size = 10,
    }: { status: RoomStatus; page?: number; size?: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await roomByStatusService(status, page, size);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Lấy danh sách phòng thất bại"
      );
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
      return rejectWithValue(
        error.message || "Lấy chi tiết phòng thất bại"
      );
    }
  }
);
