package vn.backend.backend.dto.request.room;

import lombok.Getter;
import vn.backend.backend.enums.RoomStatus;

@Getter
public class UpdateRoomRequest {
  private String roomNumber;

  private Double area;

  private Double price;

  private Integer maxPeople;

  private RoomStatus status;

  private Double electricPrice;

  private Double waterPrice;

  private Long buildingId;

  private Long managerId;
}
