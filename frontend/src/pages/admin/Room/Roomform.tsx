import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageIcon, Plus } from "lucide-react";

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

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { uploadRoomImageService } from "@/services/room.service";

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

  imageFile: null,
  imageUrl: "",
};

const RoomForm = () => {
  const { id } = useParams<{ id: string }>();

  const isEdit = Boolean(id);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { selectedRoom, submitting, error } = useAppSelector((s) => s.room);

  const [form, setForm] = useState<RoomRequest>(defaultForm);

  const [errors, setErrors] = useState<Partial<Record<keyof RoomRequest, string>>>({});

  const initializedRef = useRef(false);

  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchRoomDetailThunk(Number(id)));
    }

    return () => {
      dispatch(clearSelectedRoom());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        imageUrl: selectedRoom.imageUrl || "",
        imageFile: null,
      };
    }

    return defaultForm;
  }, [isEdit, selectedRoom]);

  useEffect(() => {
    if (isEdit && selectedRoom && !initializedRef.current) {
      setForm(initialForm);

      initializedRef.current = true;
    }
  }, [isEdit, selectedRoom, initialForm]);

  const previewSrc = form.imageFile instanceof File ? URL.createObjectURL(form.imageFile) : form.imageUrl || "";

  const validate = (): boolean => {const newErrors: Partial<Record<keyof RoomRequest, string>> = {};

    if (!form.roomNumber.trim()) {
      newErrors.roomNumber =
        "Số phòng không được để trống";
    }

    if (form.area <= 0) {
      newErrors.area =
        "Diện tích phải lớn hơn 0";
    }

    if ((form.price ?? 0) <= 0) {
      newErrors.price =
        "Giá thuê phải lớn hơn 0";
    }

    if ((form.maxPeople ?? 0) < 1) {
      newErrors.maxPeople =
        "Số người tối đa phải ít nhất 1";
    }

    if ((form.electricPrice ?? 0) <= 0) {
      newErrors.electricPrice =
        "Giá điện phải lớn hơn 0";
    }

    if ((form.waterPrice ?? 0) <= 0) {
      newErrors.waterPrice =
        "Giá nước phải lớn hơn 0";
    }

    if (!form.buildingId) {
      newErrors.buildingId =
        "Vui lòng nhập ID tòa nhà";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof RoomRequest, value: string | number | File | null,) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      let imageUrl = form.imageUrl || "";

      if (form.imageFile) {
        imageUrl =
          await uploadRoomImageService(
            form.imageFile,
          );
      }

      const payload: RoomRequest = {
        ...form,
        imageUrl,
        imageFile: null,
      };

      const action = isEdit
        ? dispatch(
            updateRoomThunk({
              id: Number(id),
              data: payload,
            }),
          )
        : dispatch(createRoomThunk(payload));

      const result = await action;

      if (
        result.meta.requestStatus ===
        "fulfilled"
      ) {
        navigate("/admin/rooms");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() =>
              navigate("/admin/rooms")
            }
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
              {isEdit
                ? "Chỉnh sửa phòng"
                : "Thêm phòng mới"}
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
            <p className="text-red-700">
              {error}
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* Thông tin */}
          <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Thông tin cơ bản
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Số phòng{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <Input
                    value={form.roomNumber}
                    onChange={(e) =>
                      handleChange(
                        "roomNumber",
                        e.target.value,
                      )
                    }
                    placeholder="VD: 101"
                    className={
                      errors.roomNumber
                        ? "border-red-400"
                        : ""
                    }
                  />

                  {errors.roomNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.roomNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    ID Tòa nhà{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <Input
                    type="number"
                    value={
                      form.buildingId || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "buildingId",
                        Number(
                          e.target.value,
                        ),
                      )
                    }
                    placeholder="VD: 1"
                    className={
                      errors.buildingId
                        ? "border-red-400"
                        : ""
                    }
                  />

                  {errors.buildingId && (
                    <p className="text-red-500 text-xs mt-1">
                      {
                        errors.buildingId
                      }
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Diện tích (m²){" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <Input
                    type="number"
                    value={form.area || ""}
                    onChange={(e) =>
                      handleChange(
                        "area",
                        Number(
                          e.target.value,
                        ),
                      )
                    }
                    placeholder="VD: 25"
                    className={
                      errors.area
                        ? "border-red-400"
                        : ""
                    }
                  />

                  {errors.area && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.area}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Số người tối đa{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <Input
                    type="number"
                    value={
                      form.maxPeople || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "maxPeople",
                        Number(
                          e.target.value,
                        ),
                      )
                    }
                    placeholder="VD: 2"
                    className={
                      errors.maxPeople
                        ? "border-red-400"
                        : ""
                    }
                  />

                  {errors.maxPeople && (
                    <p className="text-red-500 text-xs mt-1">
                      {
                        errors.maxPeople
                      }
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Trạng thái{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      handleChange(
                        "status",
                        e.target
                          .value as RoomStatus,
                      )
                    }
                    className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    {Object.values(
                      RoomStatus,
                    ).map((s) => (
                      <option
                        key={s}
                        value={s}
                      >
                        {
                          roomStatusLabels[
                            s
                          ]
                        }
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
                    value={
                      form.managerId || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "managerId",
                        e.target.value
                          ? Number(
                              e.target
                                .value,
                            )
                          : null,
                      )
                    }
                    placeholder="Để trống nếu chưa có"
                  />
                </div>
              </div>
            </div>

            {/* Giá cả */}
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Giá cả
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Giá thuê/tháng (₫)
                  </label>

                  <Input
                    type="number"
                    value={form.price || ""}
                    onChange={(e) =>
                      handleChange(
                        "price",
                        Number(
                          e.target.value,
                        ),
                      )
                    }
                    placeholder="VD: 3000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Giá điện (₫/kWh)
                  </label>

                  <Input
                    type="number"
                    value={
                      form.electricPrice ||
                      ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "electricPrice",
                        Number(
                          e.target.value,
                        ),
                      )
                    }
                    placeholder="VD: 3500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Giá nước (₫/m³)
                  </label>

                  <Input
                    type="number"
                    value={
                      form.waterPrice ||
                      ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "waterPrice",
                        Number(
                          e.target.value,
                        ),
                      )
                    }
                    placeholder="VD: 15000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ảnh phòng */}
          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-violet-100 text-violet-600">
                <ImageIcon className="w-5 h-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Ảnh phòng
                </h2>

                <p className="text-sm text-slate-500">
                  Tải ảnh đại diện cho
                  phòng
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <input
                id="room-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleChange(
                    "imageFile",
                    e.target
                      .files?.[0] ||
                      null,
                  )
                }
              />

              {!previewSrc ? (
                <label
                  htmlFor="room-image"
                  className="flex flex-col items-center justify-center w-64 h-40 transition border border-dashed cursor-pointer rounded-2xl border-slate-300 bg-slate-50 hover:bg-slate-100"
                >
                  <Plus className="w-8 h-8 text-slate-500" />

                  <span className="text-sm text-slate-500">
                    Thêm ảnh
                  </span>
                </label>
              ) : (
                <div className="relative w-fit">
                  <Dialog>
                    <DialogTrigger asChild>
                      <img
                        src={previewSrc}
                        alt="Preview"
                        className="object-cover w-64 h-40 border cursor-pointer rounded-2xl"
                      />
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                      <img
                        src={previewSrc}
                        alt="Full"
                        className="max-h-[80vh] w-full rounded-xl object-contain"
                      />
                    </DialogContent>
                  </Dialog>

                  <button
                    type="button"
                    onClick={() => {
                      handleChange(
                        "imageFile",
                        null,
                      );

                      handleChange(
                        "imageUrl",
                        "",
                      );
                    }}
                    className="absolute flex items-center justify-center text-white bg-red-500 rounded-full top-2 right-2 h-7 w-7 hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() =>
                  navigate("/admin/rooms")
                }
                className="flex-1 h-11"
                disabled={submitting}
              >
                Hủy
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 h-11 bg-violet-600 hover:bg-violet-700 text-white"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                    {isEdit
                      ? "Đang cập nhật..."
                      : "Đang tạo..."}
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
    </div>
  );
};

export default RoomForm;