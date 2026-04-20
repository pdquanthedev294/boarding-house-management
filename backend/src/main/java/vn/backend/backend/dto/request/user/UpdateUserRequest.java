package vn.backend.backend.dto.request.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import vn.backend.backend.enums.Gender;
import vn.backend.backend.enums.UserStatus;
import vn.backend.backend.enums.UserType;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
public class UpdateUserRequest implements Serializable {
  @NotNull(message = "Id must be not null")
  @Min(value = 1, message = "userId must be equals or greater than 1")
  private Long id;

  @NotBlank(message = "firstName must be not blank")
  private String firstName;

  @NotBlank(message = "lastName must be not blank")
  private String lastName;
  private Date birthday;
  private String phone;

  @Email(message = "Email invalid")
  private String email;

  private String username;
  private Gender gender;
  private UserType type;
  private UserStatus status;
  private List<UserAddressRequest> addresses;
}
