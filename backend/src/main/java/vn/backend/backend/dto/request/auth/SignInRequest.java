package vn.backend.backend.dto.request.auth;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SignInRequest implements Serializable {
  @NotNull
  private String email;

  private String username;
  private String password;
  private String platform; // web, mobile, miniApp
  private String deviceToken;
  private String versionApp;
}
