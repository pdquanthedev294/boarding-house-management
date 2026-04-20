package vn.backend.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_group_has_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupHasUserEntity extends Abstract<Long>{
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "group_id")
  private GroupEntity group;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private UserEntity user;
}
