package vn.backend.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_role_has_permission")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleHasPermissionEntity extends Abstract<Long>{
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "role_id")
  private RoleEntity role;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "permission_id")
  private PermissionEntity permission;
}
