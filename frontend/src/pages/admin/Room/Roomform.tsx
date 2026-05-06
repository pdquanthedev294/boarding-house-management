import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createRoomThunk,
  updateRoomThunk,
  fetchRoomDetailThunk,
} from "@/features/room/room.thunk";
import { clearSelectedRoom } from "@/features/room/room.slice";
import { RoomStatus } from "@/types/room.types";
import type { RoomRequest } from "@/types/room.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const roomStatusLabels: Record<RoomStatus, string> = {
  [RoomStatus.AVAILABLE]: "Trống",
  [RoomStatus.OCCUPIED]: "Đã thuê",
  [RoomStatus.MAINTENANCE]: "Bảo trì",
  [RoomStatus.RESERVED]: "Đã đặt",
};

const defaultForm: RoomRequest = {
  roomNumber: "",
  area: 0,
  price: 0,
  maxPeople: 1,
  status: RoomStatus.AVAILABLE,
  electricPrice: 0,
  waterPrice: 0,
  buildingId: 0,
  managerId: null,
};

const RoomForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedRoom, submitting, error } = useAppSelector((s) => s.room);
  const [form, setForm] = useState<RoomRequest>(defaultForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RoomRequest, string>>
  >({});

  const initializedRef = useRef(false);
  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchRoomDetailThunk(Number(id)));
    }
    return () => {
      dispatch(clearSelectedRoom());
    };
  }, [id]);

  const initialForm: RoomRequest = useMemo(() => {
    if (isEdit && selectedRoom) {
      return {
        roomNumber: selectedRoom.roomNumber,
        area: selectedRoom.area,
        price: selectedRoom.price,
        maxPeople: selectedRoom.maxPeople,
        status: selectedRoom.status,
        electricPrice: selectedRoom.electricPrice,
        waterPrice: selectedRoom.waterPrice,
        buildingId: selectedRoom.buildingId,
        managerId: selectedRoom.managerId,
      };
    }
    return defaultForm;
  }, [isEdit, selectedRoom]);

  
  // Thêm useEffect này để sync khi selectedRoom load xong
  useEffect(() => {
    if (isEdit && selectedRoom && !initializedRef.current) {
      setForm(initialForm);
      initializedRef.current = true;
    }
  }, [isEdit, selectedRoom, initialForm]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RoomRequest, string>> = {};
    if (!form.roomNumber.trim())
      newErrors.roomNumber = "Số phòng không được để trống";
    if (form.area <= 0) newErrors.area = "Diện tích phải lớn hơn 0";
    if (form.price < 0) newErrors.price = "Giá thuê không được âm";
    if (form.maxPeople < 1)
      newErrors.maxPeople = "Số người tối đa phải ít nhất 1";
    if (form.electricPrice < 0)
      newErrors.electricPrice = "Giá điện không được âm";
    if (form.waterPrice < 0) newErrors.waterPrice = "Giá nước không được âm";
    if (!form.buildingId) newErrors.buildingId = "Vui lòng nhập ID tòa nhà";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof RoomRequest, value: string | number | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const action = isEdit
      ? dispatch(updateRoomThunk({ id: Number(id), data: form }))
      : dispatch(createRoomThunk(form));

    const result = await action;
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/admin/rooms");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/rooms")}
            className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <svg
              className="w-5 h-5 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {isEdit ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
            </h1>
            <p className="text-slate-600 mt-1">
              {isEdit
                ? "Cập nhật thông tin phòng"
                : "Điền thông tin để tạo phòng mới"}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {/* Thông tin cơ bản */}
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b">
              Thông tin cơ bản
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Số phòng <span className="text-red-500">*</span>
                </label>
                <Input
                  value={form.roomNumber}
                  onChange={(e) => handleChange("roomNumber", e.target.value)}
                  placeholder="VD: 101"
                  className={errors.roomNumber ? "border-red-400" : ""}
                />
                {errors.roomNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.roomNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  ID Tòa nhà <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={form.buildingId || ""}
                  onChange={(e) =>
                    handleChange("buildingId", Number(e.target.value))
                  }
                  placeholder="VD: 1"
                  className={errors.buildingId ? "border-red-400" : ""}
                />
                {errors.buildingId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.buildingId}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Diện tích (m²) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={form.area || ""}
                  onChange={(e) => handleChange("area", Number(e.target.value))}
                  placeholder="VD: 25"
                  className={errors.area ? "border-red-400" : ""}
                />
                {errors.area && (
                  <p className="text-red-500 text-xs mt-1">{errors.area}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Số người tối đa <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={form.maxPeople || ""}
                  onChange={(e) =>
                    handleChange("maxPeople", Number(e.target.value))
                  }
                  placeholder="VD: 2"
                  className={errors.maxPeople ? "border-red-400" : ""}
                />
                {errors.maxPeople && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.maxPeople}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    handleChange("status", e.target.value as RoomStatus)
                  }
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {Object.values(RoomStatus).map((s) => (
                    <option key={s} value={s}>
                      {roomStatusLabels[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  ID Quản lý
                </label>
                <Input
                  type="number"
                  value={form.managerId || ""}
                  onChange={(e) =>
                    handleChange(
                      "managerId",
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  placeholder="Để trống nếu chưa có"
                />
              </div>
            </div>
          </div>

          {/* Giá cả */}
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b">
              Giá cả
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Giá thuê/tháng (₫) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={form.price || ""}
                  onChange={(e) =>
                    handleChange("price", Number(e.target.value))
                  }
                  placeholder="VD: 3000000"
                  className={errors.price ? "border-red-400" : ""}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Giá điện (₫/kWh) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={form.electricPrice || ""}
                  onChange={(e) =>
                    handleChange("electricPrice", Number(e.target.value))
                  }
                  placeholder="VD: 3500"
                  className={errors.electricPrice ? "border-red-400" : ""}
                />
                {errors.electricPrice && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.electricPrice}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Giá nước (₫/m³) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={form.waterPrice || ""}
                  onChange={(e) =>
                    handleChange("waterPrice", Number(e.target.value))
                  }
                  placeholder="VD: 15000"
                  className={errors.waterPrice ? "border-red-400" : ""}
                />
                {errors.waterPrice && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.waterPrice}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/rooms")}
              className="flex-1"
              disabled={submitting}
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 bg-violet-600 hover:bg-violet-700 text-white"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isEdit ? "Đang cập nhật..." : "Đang tạo..."}
                </span>
              ) : isEdit ? (
                "Cập nhật phòng"
              ) : (
                "Tạo phòng"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomForm;
