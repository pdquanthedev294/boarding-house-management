import type { PayloadAction } from "@reduxjs/toolkit";
import type { Room, RoomListResponse, RoomState } from "@/types/room.types";

export const setLoading = (state: RoomState) => {
  state.loading = true;
  state.error = null;
};

export const setSubmitting = (state: RoomState) => {
  state.submitting = true;
  state.error = null;
};

export const setError = (
  state: RoomState,
  action: PayloadAction<unknown>
) => {
  state.loading = false;
  state.submitting = false;
  state.error = action.payload as string;
};

export const setRoomList = (
  state: RoomState,
  action: PayloadAction<RoomListResponse>
) => {
  state.loading = false;

  state.rooms = action.payload.content;
  state.currentPage = action.payload.pageable.pageNumber;
  state.pageSize = action.payload.pageable.pageSize;
  state.totalPages = action.payload.totalPages;
  state.totalElements = action.payload.totalElements;
};

export const addRoom = (
  state: RoomState,
  action: PayloadAction<Room>
) => {
  state.submitting = false;
  state.rooms.unshift(action.payload);
  state.totalElements += 1;
};

export const updateRoom = (
  state: RoomState,
  action: PayloadAction<Room>
) => {
  state.submitting = false;

  const idx = state.rooms.findIndex(
    (r) => r.id === action.payload.id
  );

  if (idx !== -1) {
    state.rooms[idx] = action.payload;
  }

  if (state.selectedRoom?.id === action.payload.id) {
    state.selectedRoom = action.payload;
  }
};

export const removeRoom = (
  state: RoomState,
  action: PayloadAction<number>
) => {
  state.submitting = false;

  state.rooms = state.rooms.filter(
    (r) => r.id !== action.payload
  );

  state.totalElements -= 1;
};