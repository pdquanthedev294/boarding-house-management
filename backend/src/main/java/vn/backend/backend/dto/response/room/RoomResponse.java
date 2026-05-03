package vn.backend.backend.dto.response.room;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.backend.backend.enums.RoomStatus;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomResponse {
  private Long id;
  private String roomNumber;
  private Double area;
  private Double price;
  private Integer maxPeople;
  private RoomStatus status;
  private Double electricPrice;
  private Double waterPrice;
  private Long buildingId;
  private String buildingName;
  private Long managerId;
  private String managerName;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
