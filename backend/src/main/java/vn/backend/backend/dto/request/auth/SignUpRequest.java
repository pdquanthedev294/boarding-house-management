package vn.backend.backend.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class SignUpRequest {
  @NotBlank
  private String email;

  @NotBlank
  private String password;
}
