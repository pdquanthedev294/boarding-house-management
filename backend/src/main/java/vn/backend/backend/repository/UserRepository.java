package vn.backend.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.backend.backend.entities.UserEntity;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
//  Page<UserEntity> searchByKeyword(String keyword, Pageable pageable);

  UserEntity findByUsername(String username);
  Optional<UserEntity> findByEmail(String email);
}
