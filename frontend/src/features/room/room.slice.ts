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

import type { RoomState } from "@/types/room.types";

import {
  setLoading,
  setSubmitting,
  setError,
  setRoomList,
  addRoom,
  updateRoom,
  removeRoom,
} from "./room.helpers";

const initialState: RoomState = {
  rooms: [],
  selectedRoom: null,
  loading: false,
  submitting: false,
  error: null,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  pageSize: 2,
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

    clearSelectedRoom: (state) => {
      state.selectedRoom = null;
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
    // Fetch all
    builder
      .addCase(fetchRoomsThunk.pending, setLoading)
      .addCase(fetchRoomsThunk.fulfilled, setRoomList)
      .addCase(fetchRoomsThunk.rejected, setError);

    // Fetch by building
    builder
      .addCase(fetchRoomsByBuildingThunk.pending, setLoading)
      .addCase(fetchRoomsByBuildingThunk.fulfilled, setRoomList)
      .addCase(fetchRoomsByBuildingThunk.rejected, setError);

    // Fetch by status
    builder
      .addCase(fetchRoomsByStatusThunk.pending, setLoading)
      .addCase(fetchRoomsByStatusThunk.fulfilled, setRoomList)
      .addCase(fetchRoomsByStatusThunk.rejected, setError);

    // Detail
    builder
      .addCase(fetchRoomDetailThunk.pending, setLoading)
      .addCase(fetchRoomDetailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRoom = action.payload;
      })
      .addCase(fetchRoomDetailThunk.rejected, setError);

    // Create
    builder
      .addCase(createRoomThunk.pending, setSubmitting)
      .addCase(createRoomThunk.fulfilled, addRoom)
      .addCase(createRoomThunk.rejected, setError);

    // Update
    builder
      .addCase(updateRoomThunk.pending, setSubmitting)
      .addCase(updateRoomThunk.fulfilled, updateRoom)
      .addCase(updateRoomThunk.rejected, setError);

    // Delete
    builder
      .addCase(deleteRoomThunk.pending, setSubmitting)
      .addCase(deleteRoomThunk.fulfilled, removeRoom)
      .addCase(deleteRoomThunk.rejected, setError);
  },
});

export const {
  clearError,
  clearSelectedRoom,
  setPageSize,
  setFilterStatus,
  setFilterBuildingId,
} = roomSlice.actions;

export default roomSlice.reducer;