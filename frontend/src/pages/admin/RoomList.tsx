import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchRoomsThunk,
  fetchRoomsByStatusThunk,
} from "@/features/room/room.thunk";
import { setFilterStatus } from "@/features/room/room.slice";
import { RoomStatus } from "@/types/room.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const roomStatusLabels: Record<RoomStatus, string> = {
  [RoomStatus.AVAILABLE]: "Trống",
  [RoomStatus.OCCUPIED]: "Đã thuê",
  [RoomStatus.MAINTENANCE]: "Bảo trì",
  [RoomStatus.RESERVED]: "Đã đặt",
};

const statusColors: Record<RoomStatus, string> = {
  [RoomStatus.AVAILABLE]: "bg-green-100 text-green-800",
  [RoomStatus.OCCUPIED]: "bg-red-100 text-red-800",
  [RoomStatus.MAINTENANCE]: "bg-yellow-100 text-yellow-800",
  [RoomStatus.RESERVED]: "bg-blue-100 text-blue-800",
};

const RoomList = () => {
  const dispatch = useAppDispatch();
  const {
    rooms,
    loading,
    error,
    currentPage,
    totalPages,
    totalElements,
    pageSize,
    filterStatus,
  } = useAppSelector((s) => s.room);

  const [searchRoom, setSearchRoom] = useState("");
  const [activeStatus, setActiveStatus] = useState<RoomStatus | null>(null);

  useEffect(() => {
    dispatch(fetchRoomsThunk({ page: currentPage, size: pageSize }));
  }, []);

  const handleStatusFilter = (status: RoomStatus) => {
    if (activeStatus === status) {
      setActiveStatus(null);
      dispatch(fetchRoomsThunk({ page: 0, size: pageSize }));
    } else {
      setActiveStatus(status);
      dispatch(fetchRoomsByStatusThunk({ status, page: 0, size: pageSize }));
    }
  };

  const handlePageChange = (newPage: number) => {
    if (activeStatus) {
      dispatch(
        fetchRoomsByStatusThunk({
          status: activeStatus,
          page: newPage,
          size: pageSize,
        })
      );
    } else {
      dispatch(fetchRoomsThunk({ page: newPage, size: pageSize }));
    }
  };

  const filteredRooms = rooms.filter((room) =>
    room.roomNumber.toLowerCase().includes(searchRoom.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Danh sách phòng
          </h1>
          <p className="text-slate-600">
            Quản lý và xem thông tin chi tiết về các phòng cho thuê
          </p>
        </div>

        {/* ERROR ALERT */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* FILTERS SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          {/* Search Box */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tìm kiếm phòng
            </label>
            <Input
              placeholder="Nhập số phòng (VD: 101, 202)..."
              value={searchRoom}
              onChange={(e) => setSearchRoom(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Status Filter Buttons */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Lọc theo trạng thái
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.values(RoomStatus).map((status) => (
                <Button
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  variant={activeStatus === status ? "default" : "outline"}
                  className={
                    activeStatus === status
                      ? "bg-violet-600 hover:bg-violet-700"
                      : ""
                  }
                >
                  {roomStatusLabels[status]}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* ROOMS GRID */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin">
              <div className="h-12 w-12 border-4 border-violet-600 border-t-transparent rounded-full"></div>
            </div>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-slate-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Không tìm thấy phòng
            </h3>
            <p className="text-slate-600">
              Thử thay đổi bộ lọc hoặc tìm kiếm để xem phòng khác
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                {/* Room Header */}
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold">#{room.roomNumber}</h3>
                      <p className="text-violet-100 text-sm mt-1">
                        {room.buildingName}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColors[room.status]
                      }`}
                    >
                      {roomStatusLabels[room.status]}
                    </span>
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-4 space-y-3">
                  {/* Area */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-sm">Diện tích</span>
                    <span className="font-semibold text-slate-900">
                      {room.area} m²
                    </span>
                  </div>

                  {/* People */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-sm">
                      Số người tối đa
                    </span>
                    <span className="font-semibold text-slate-900">
                      {room.maxPeople} người
                    </span>
                  </div>

                  {/* Price */}
                  <div className="border-t pt-3">
                    <span className="text-slate-600 text-sm">Giá thuê/tháng</span>
                    <p className="text-2xl font-bold text-violet-600 mt-1">
                      {room.price.toLocaleString("vi-VN")}₫
                    </p>
                  </div>

                  {/* Utilities */}
                  <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Điện</span>
                      <span className="font-medium">
                        {room.electricPrice.toLocaleString("vi-VN")}₫/kWh
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Nước</span>
                      <span className="font-medium">
                        {room.waterPrice.toLocaleString("vi-VN")}₫/m³
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white mt-4">
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button
              variant="outline"
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Trước
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={currentPage === i ? "default" : "outline"}
                onClick={() => handlePageChange(i)}
                className={currentPage === i ? "bg-violet-600" : ""}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              disabled={currentPage === totalPages - 1}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Sau
            </Button>
          </div>
        )}

        {/* STATS */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <p className="text-slate-600 text-sm mb-1">Tổng phòng</p>
            <p className="text-3xl font-bold text-slate-900">{totalElements}</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <p className="text-slate-600 text-sm mb-1">Trang hiện tại</p>
            <p className="text-3xl font-bold text-slate-900">
              {currentPage + 1}/{totalPages}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <p className="text-slate-600 text-sm mb-1">Phòng trên trang</p>
            <p className="text-3xl font-bold text-slate-900">
              {filteredRooms.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
