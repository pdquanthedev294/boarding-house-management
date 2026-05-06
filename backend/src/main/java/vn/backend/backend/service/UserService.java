package vn.backend.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.backend.backend.dto.request.user.ChangePasswordRequest;
import vn.backend.backend.dto.request.user.CreateUserRequest;
import vn.backend.backend.dto.request.user.UpdateUserRequest;
import vn.backend.backend.dto.response.user.UserResponse;

public interface UserService {
  Page<UserResponse> findAll(Pageable pageable);

  UserResponse findById(Long id);

  UserResponse findByUsername(String username);

  UserResponse findByEmail(String email);

  long save(CreateUserRequest req);

  void update(UpdateUserRequest req);

  void changePassword(ChangePasswordRequest req);

  void delete(Long id);
}
