package vn.backend.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "tbl_password_reset_token")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordResetTokenEntity extends Abstract<Long> {

  @Column(name = "email", length = 255, nullable = false)
  private String email;

  @Column(name = "otp", length = 20, nullable = false)
  private String otp;

  @Column(name = "expires_at")
  private Date expiresAt;

  @Column(name = "is_verified")
  private boolean verified;

  @Column(name = "is_used")
  private boolean used;
}
