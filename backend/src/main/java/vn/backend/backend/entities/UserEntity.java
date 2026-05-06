package vn.backend.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import vn.backend.backend.enums.Gender;
import vn.backend.backend.enums.UserStatus;
import vn.backend.backend.enums.UserType;

import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "tbl_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity extends Abstract<Long> implements UserDetails, Serializable {
  @Column(name = "first_name", length = 255)
  private String firstName;

  @Column(name = "last_name", length = 255)
  private String lastName;

  @Column(name = "date_of_birth")
  private Date dateOfBirth;

  @Column(name = "phone", length = 15)
  private String phone;

  @Column(name = "email", length = 255)
  private String email;

  @Column(name = "username", unique = true, nullable = false, length = 255)
  private String username;

  @Column(name = "password", length = 255)
  private String password;

  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "gender")
  private Gender gender;

  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "type", length = 255)
  private UserType type;

  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "status", length = 255)
  private UserStatus status;

  @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
  private Set<UserHasRoleEntity> roles = new HashSet<>();

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return roles.stream()
      .map(r -> new SimpleGrantedAuthority(
        "ROLE_" + r.getRole().getName().toUpperCase()
      ))
      .toList();
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return UserStatus.ACTIVE.equals(status);
  }
}
