package vn.backend.backend.dto.request.room;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import vn.backend.backend.enums.RoomStatus;

@Getter
@Setter
public class CreateRoomRequest {

  @NotBlank(message = "Số phòng không được để trống")
  private String roomNumber;

  @NotNull(message = "Diện tích không được để trống")
  @Min(value = 1, message = "Diện tích phải lớn hơn 0")
  private Double area;

  @NotNull(message = "Giá thuê không được để trống")
  @Min(value = 0, message = "Giá thuê không được âm")
  private Double price;

  @NotNull(message = "Số người tối đa không được để trống")
  @Min(value = 1, message = "Số người tối đa phải lớn hơn 0")
  private Integer maxPeople;

  @NotNull(message = "Trạng thái không được để trống")
  private RoomStatus status;

  @NotNull(message = "Giá điện không được để trống")
  @Min(value = 0, message = "Giá điện không được âm")
  private Double electricPrice;

  @NotNull(message = "Giá nước không được để trống")
  @Min(value = 0, message = "Giá nước không được âm")
  private Double waterPrice;

  @NotNull(message = "Tòa nhà không được để trống")
  private Long buildingId;

  private Long managerId;
}