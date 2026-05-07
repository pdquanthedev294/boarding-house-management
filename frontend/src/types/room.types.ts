export const RoomStatus = {
  AVAILABLE: "AVAILABLE",
  OCCUPIED: "OCCUPIED",
  MAINTENANCE: "MAINTENANCE",
  RESERVED: "RESERVED",
} as const;

export type RoomStatus =
  (typeof RoomStatus)[keyof typeof RoomStatus];

export interface Room {
  id: number;
  roomNumber: string;
  area: number;
  price: number | null;
  maxPeople: number | null;
  status: RoomStatus;
  electricPrice: number | null;
  waterPrice: number | null;
  buildingId: number;
  buildingName: string;
  managerId: number | null;
  managerName: string | null;

  imageUrl?: string;

  createdAt: string;
  updatedAt: string;
}

export interface RoomRequest {
  roomNumber: string;
  area: number;
  price: number | null;
  maxPeople: number | null;
  status: RoomStatus;
  electricPrice: number | null;
  waterPrice: number | null;
  buildingId: number;
  managerId?: number | null;

  imageUrl?: string;
  imageFile?: File | null;
}

export interface PaginationMeta {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface RoomListResponse {
  content: Room[];

  pageable: {
    pageNumber: number;
    pageSize: number;
  };

  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  empty: boolean;
}

export interface RoomListRequest {
  page?: number;
  size?: number;
  buildingId?: number;
  status?: RoomStatus;
}

export interface RoomState {
  rooms: Room[];
  selectedRoom: Room | null;

  loading: boolean;
  submitting: boolean;
  error: string | null;

  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;

  filterStatus: RoomStatus | null;
  filterBuildingId: number | null;
}