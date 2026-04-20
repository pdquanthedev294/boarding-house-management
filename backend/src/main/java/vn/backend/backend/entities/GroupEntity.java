package vn.backend.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_group")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupEntity extends Abstract<Long> {
  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "role_id")
  private RoleEntity role;
}
