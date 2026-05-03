export const RoomStatus = {
  AVAILABLE: "AVAILABLE",
  OCCUPIED: "OCCUPIED",
  MAINTENANCE: "MAINTENANCE",
  RESERVED: "RESERVED",
} as const;

export type RoomStatus = (typeof RoomStatus)[keyof typeof RoomStatus];

export interface Room {
  id: number;
  roomNumber: string;
  area: number;
  price: number;
  maxPeople: number;
  status: RoomStatus;
  electricPrice: number;
  waterPrice: number;
  buildingId: number;
  buildingName: string;
  managerId: number | null;
  managerName: string | null;
  createdAt: string;
  updatedAt: string;
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
