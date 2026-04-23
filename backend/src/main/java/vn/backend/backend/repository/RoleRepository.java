package vn.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.backend.backend.entities.RoleEntity;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
  Optional<RoleEntity> findByName(String name);
}
