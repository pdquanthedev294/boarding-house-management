package vn.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.backend.backend.entities.PasswordResetTokenEntity;

import java.util.Date;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetTokenEntity, Long> {
  Optional<PasswordResetTokenEntity> findFirstByEmailAndOtpAndUsedFalseAndExpiresAtAfterOrderByCreatedAtDesc(
    String email,
    String otp,
    Date now
  );

  Optional<PasswordResetTokenEntity> findFirstByEmailAndVerifiedTrueAndUsedFalseAndExpiresAtAfterOrderByCreatedAtDesc(
    String email,
    Date now
  );
}
