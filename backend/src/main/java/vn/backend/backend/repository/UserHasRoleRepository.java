package vn.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.backend.backend.entities.UserHasRoleEntity;

public interface UserHasRoleRepository extends JpaRepository<UserHasRoleEntity, Long> {
}
