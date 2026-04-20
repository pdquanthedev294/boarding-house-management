package vn.backend.backend.dto.request.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
public class CreateUserRequest implements Serializable {
  @NotBlank(message = "firstName must be not blank")
  private String firstName;

  @NotBlank(message = "lastName must be not blank")
  private String lastName;

  private Date dateOfBirth;

  @NotBlank(message = "phone must be not blank")
  private String phone;

  @NotBlank(message = "email must be not blank")
  @Email(message = "Email invalid")
  private String email;

  @NotBlank(message = "username must be not blank")
  private String username;

  @NotBlank(message = "password must be not blank")
  @Size(min = 6, message = "password must be at least 6 characters")
  private String password;

  @NotNull(message = "gender must not be nll")
  private String gender;

  @NotNull(message = "type must not be null")
  private String type;

  @NotNull(message = "status must not be null")
  private String status;

  private List<Long> roleIds;

  private List<UserAddressRequest> addresses;
}
