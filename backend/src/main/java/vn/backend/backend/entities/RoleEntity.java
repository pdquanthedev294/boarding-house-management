package vn.backend.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "tbl_role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleEntity extends Abstract<Long>{
  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;
}
