package vn.backend.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import vn.backend.backend.enums.BuildingStatus;

@Entity
@Table(name = "tbl_building")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BuildingEntity extends Abstract<Long> {

  @Column(name = "name")
  private String name;

  @Column(name = "address")
  private String address;

  @Column(name = "district")
  private String district;

  @Column(name = "number_of_room")
  private Integer numberOfRoom;

  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  private BuildingStatus status;

  @Column(name = "image")
  private String image;

  @Column(name = "note")
  private String note;
}
