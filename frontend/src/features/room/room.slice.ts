import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRoomsThunk,
  fetchRoomsByBuildingThunk,
  fetchRoomsByStatusThunk,
  fetchRoomDetailThunk,
  createRoomThunk,
  updateRoomThunk,
  deleteRoomThunk,
} from "./room.thunk";
import type { Room, RoomStatus } from "@/types/room.types";

interface RoomState {
  rooms: Room[];
  selectedRoom: Room | null;
  loading: boolean;
  submitting: boolean; // cho create/update/delete
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
  submitting: false,
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
    clearError: (state) => { state.error = null; },
    clearSelectedRoom: (state) => { state.selectedRoom = null; },
    setPageSize: (state, action) => { state.pageSize = action.payload; },
    setFilterStatus: (state, action) => { state.filterStatus = action.payload; },
    setFilterBuildingId: (state, action) => { state.filterBuildingId = action.payload; },
  },
  extraReducers: (builder) => {
    // Fetch all
    builder
      .addCase(fetchRoomsThunk.pending, (state) => { state.loading = true; state.error = null; })
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

    // Fetch by building
    builder
      .addCase(fetchRoomsByBuildingThunk.pending, (state) => { state.loading = true; state.error = null; })
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

    // Fetch by status
    builder
      .addCase(fetchRoomsByStatusThunk.pending, (state) => { state.loading = true; state.error = null; })
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

    // Fetch detail
    builder
      .addCase(fetchRoomDetailThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchRoomDetailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRoom = action.payload ?? null;
      })
      .addCase(fetchRoomDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create
    builder
      .addCase(createRoomThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(createRoomThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.rooms.unshift(action.payload);
        state.totalElements += 1;
      })
      .addCase(createRoomThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      });

    // Update
    builder
      .addCase(updateRoomThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(updateRoomThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.rooms.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.rooms[idx] = action.payload;
        if (state.selectedRoom?.id === action.payload.id) state.selectedRoom = action.payload;
      })
      .addCase(updateRoomThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      });

    // Delete
    builder
      .addCase(deleteRoomThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(deleteRoomThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.rooms = state.rooms.filter((r) => r.id !== action.payload);
        state.totalElements -= 1;
      })
      .addCase(deleteRoomThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedRoom, setPageSize, setFilterStatus, setFilterBuildingId } =
  roomSlice.actions;
export default roomSlice.reducer;