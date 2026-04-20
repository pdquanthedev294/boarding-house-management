package vn.backend.backend.dto.response.user;

import lombok.*;
import vn.backend.backend.enums.Gender;
import vn.backend.backend.enums.UserStatus;
import vn.backend.backend.enums.UserType;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse implements Serializable {
  private Long id;
  private String firstName;
  private String lastName;
  private Date birthday;
  private String phone;
  private String email;
  private String username;
  private Gender gender;
  private UserType type;
  private UserStatus status;
}
