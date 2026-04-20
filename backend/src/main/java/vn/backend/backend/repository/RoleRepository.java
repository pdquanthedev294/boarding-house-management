package vn.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.backend.backend.entities.RoleEntity;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

}
