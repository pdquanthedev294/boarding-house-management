package vn.backend.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_room_image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomImageEntity extends Abstract<Long>{
  @Column(name = "image_url")
  private String imageUrl;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "room_id")
  private RoomEntity room;
}
