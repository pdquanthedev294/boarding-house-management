package vn.backend.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import vn.backend.backend.enums.RoomStatus;

@Entity
@Table(name = "tbl_room")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomEntity extends Abstract<Long>{
  @Column(name = "room_number")
  private String roomNumber;

  @Column(name = "area")
  private Double area;

  @Column(name = "price")
  private Double price;

  @Column(name = "max_people")
  private Integer maxPeople;

  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  private RoomStatus status;

  @Column(name = "electric_price")
  private Double electricPrice;

  @Column(name = "water_price")
  private Double waterPrice;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "building_id")
  private BuildingEntity building;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "manager_id")
  private UserEntity manager;
}
