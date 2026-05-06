import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRoomDetailThunk, deleteRoomThunk } from "@/features/room/room.thunk";
import { clearSelectedRoom } from "@/features/room/room.slice";
import { RoomStatus } from "@/types/room.types";

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

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedRoom, loading, submitting, error } = useAppSelector((s) => s.room);

  useEffect(() => {
    if (id) dispatch(fetchRoomDetailThunk(Number(id)));
    return () => { dispatch(clearSelectedRoom()); };
  }, [id]);

  const handleDelete = async () => {
    if (!selectedRoom) return;
    if (!confirm(`Bạn có chắc muốn xóa phòng ${selectedRoom.roomNumber}?`)) return;
    const result = await dispatch(deleteRoomThunk(selectedRoom.id));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/admin/rooms");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="h-12 w-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !selectedRoom) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center gap-4">
        <p className="text-red-600">{error || "Không tìm thấy phòng"}</p>
        <button onClick={() => navigate("/admin/rooms")} className="text-violet-600 hover:underline">
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/rooms")}
              className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Phòng #{selectedRoom.roomNumber}</h1>
              <p className="text-slate-500 mt-1">{selectedRoom.buildingName}</p>
            </div>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${statusColors[selectedRoom.status]}`}>
            {roomStatusLabels[selectedRoom.status]}
          </span>
        </div>

        <div className="space-y-6">
          {/* Thông tin chính */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white">
              <h2 className="text-lg font-semibold mb-1">Thông tin phòng</h2>
              <p className="text-violet-100 text-sm">Chi tiết đầy đủ về phòng</p>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <InfoItem label="Số phòng" value={`#${selectedRoom.roomNumber}`} />
              <InfoItem label="Tòa nhà" value={selectedRoom.buildingName} />
              <InfoItem label="Diện tích" value={`${selectedRoom.area} m²`} />
              <InfoItem label="Số người tối đa" value={`${selectedRoom.maxPeople} người`} />
              <InfoItem label="Quản lý" value={selectedRoom.managerName || "Chưa có"} />
              <InfoItem
                label="Ngày tạo"
                value={selectedRoom.createdAt ? new Date(selectedRoom.createdAt).toLocaleDateString("vi-VN") : "—"}
              />
            </div>
          </div>

          {/* Giá cả */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Giá cả</h2>
            <div className="grid grid-cols-3 gap-4">
              <PriceCard
                label="Giá thuê/tháng"
                value={`${selectedRoom.price.toLocaleString("vi-VN")}₫`}
                accent
              />
              <PriceCard
                label="Giá điện"
                value={`${selectedRoom.electricPrice.toLocaleString("vi-VN")}₫/kWh`}
              />
              <PriceCard
                label="Giá nước"
                value={`${selectedRoom.waterPrice.toLocaleString("vi-VN")}₫/m³`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/admin/rooms/edit/${selectedRoom.id}`)}
              className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Chỉnh sửa
            </button>
            <button
              onClick={handleDelete}
              disabled={submitting}
              className="flex-1 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-red-200"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
              Xóa phòng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-slate-500 mb-1">{label}</p>
    <p className="font-semibold text-slate-900">{value}</p>
  </div>
);

const PriceCard = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className={`rounded-lg p-4 ${accent ? "bg-violet-50 border border-violet-200" : "bg-slate-50"}`}>
    <p className="text-sm text-slate-500 mb-1">{label}</p>
    <p className={`text-xl font-bold ${accent ? "text-violet-600" : "text-slate-900"}`}>{value}</p>
  </div>
);

export default RoomDetail;