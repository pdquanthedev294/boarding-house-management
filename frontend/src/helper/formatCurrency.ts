export const formatCurrency = (value?: number | null, p?: string) => {
  if (value == null) return "Chưa cập nhật";

  return `${value.toLocaleString("vi-VN")}₫`;
};

export const formatText = (value?: string | null) => {
  return value?.trim() || "Chưa cập nhật";
};

export const formatPeople = (value?: number | null) => {
  if (value == null) return "Chưa cập nhật";

  return `${value} người`;
};