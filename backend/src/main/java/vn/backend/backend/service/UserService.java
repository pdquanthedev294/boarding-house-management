package vn.backend.backend.service;

import vn.backend.backend.dto.request.user.ChangePasswordRequest;
import vn.backend.backend.dto.request.user.CreateUserRequest;
import vn.backend.backend.dto.request.user.UpdateUserRequest;
import vn.backend.backend.dto.response.user.UserPageResponse;
import vn.backend.backend.dto.response.user.UserResponse;

import java.util.List;

public interface UserService {
//  UserPageResponse findAll(String keyword, String sort, int page, int size);

  UserResponse findById(Long id);

  UserResponse findByUsername(String username);

  UserResponse findByEmail(String email);

  long save(CreateUserRequest req);

  void update(UpdateUserRequest req);

  void changePassword(ChangePasswordRequest req);

  void delete(Long id);
}
