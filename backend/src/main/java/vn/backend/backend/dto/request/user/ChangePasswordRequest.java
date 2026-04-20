package vn.backend.backend.dto.request.user;

import lombok.Getter;

import java.io.Serializable;

@Getter
public class ChangePasswordRequest implements Serializable {
  private Long id;
  private String password;
  private String confirmPassword;
}
