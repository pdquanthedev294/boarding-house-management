import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRoomsThunk,
  fetchRoomsByBuildingThunk,
  fetchRoomsByStatusThunk,
  fetchRoomDetailThunk,
} from "./room.thunk";
import type { Room, RoomStatus } from "@/types/room.types";

interface RoomState {
  rooms: Room[];
  selectedRoom: Room | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  filterStatus: RoomStatus | null;
  filterBuildingId: number | null;
}

const initialState: RoomState = {
  rooms: [],
  selectedRoom: null,
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  pageSize: 10,
  filterStatus: null,
  filterBuildingId: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setFilterBuildingId: (state, action) => {
      state.filterBuildingId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all rooms
    builder
      .addCase(fetchRoomsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload.content;
        state.currentPage = action.payload.pageable.pageNumber;
        state.pageSize = action.payload.pageable.pageSize;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchRoomsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch rooms by building
    builder
      .addCase(fetchRoomsByBuildingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomsByBuildingThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload.content;
        state.currentPage = action.payload.pageable.pageNumber;
        state.pageSize = action.payload.pageable.pageSize;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchRoomsByBuildingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch rooms by status
    builder
      .addCase(fetchRoomsByStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomsByStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload.content;
        state.currentPage = action.payload.pageable.pageNumber;
        state.pageSize = action.payload.pageable.pageSize;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchRoomsByStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch room detail
    builder
      .addCase(fetchRoomDetailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomDetailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRoom = action.payload;
      })
      .addCase(fetchRoomDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  setPageSize,
  setFilterStatus,
  setFilterBuildingId,
} = roomSlice.actions;
export default roomSlice.reducer;
