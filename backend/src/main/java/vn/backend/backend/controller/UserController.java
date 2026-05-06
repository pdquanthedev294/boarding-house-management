package vn.backend.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.backend.backend.dto.request.user.ChangePasswordRequest;
import vn.backend.backend.dto.request.user.CreateUserRequest;
import vn.backend.backend.dto.request.user.UpdateUserRequest;
import vn.backend.backend.dto.response.common.ApiResponse;
import vn.backend.backend.service.UserService;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Tag(name = "User Controller")
@RequiredArgsConstructor
@Slf4j(topic = "USER-CONTROLLER")
public class UserController {

  private final UserService userService;

  @Operation(summary = "Get user list", description = "API retrieve user from db")
  @GetMapping("/list")
  public ApiResponse getAllUsers(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size
  ) {
    log.info("GET /user/list");

    if (page < 1) page = 1;

    Pageable pageable = PageRequest.of(page - 1, size);

    return ApiResponse.builder()
      .status(200)
      .message("Lấy danh sách user thành công")
      .data(userService.findAll(pageable))
      .build();
  }


  @Operation(summary = "Get user detail", description = "API retrieve user detail by ID")
  @GetMapping("/{userId}")
  public ApiResponse getUserDetail(@PathVariable Long userId) {
    log.info("GET /user/{}", userId);

    return ApiResponse.builder()
      .status(200)
      .message("Lấy thông tin user thành công")
      .data(userService.findById(userId))
      .build();
  }

  @Operation(summary = "Create user", description = "API add new user to db")
  @PostMapping("/create")
  public ApiResponse createUser(@Valid @RequestBody CreateUserRequest request) {
    log.info("POST /user/create");

    return ApiResponse.builder()
      .status(201)
      .message("Tạo user thành công")
      .data(userService.save(request))
      .build();
  }

  @Operation(summary = "Update user", description = "API update user to db")
  @PatchMapping("/update")
  public ApiResponse updateUser(@Valid @RequestBody UpdateUserRequest request) {
    log.info("PATCH /user/update");

    userService.update(request);

    return ApiResponse.builder()
      .status(200)
      .message("Cập nhật user thành công")
      .data(null)
      .build();
  }

  @Operation(summary = "Change password", description = "API change password for user to database")
  @PatchMapping("/change-password")
  public ApiResponse changePassword(@Valid @RequestBody ChangePasswordRequest request) {
    log.info("PATCH /user/change-password");

    userService.changePassword(request);

    return ApiResponse.builder()
      .status(200)
      .message("Đổi mật khẩu thành công")
      .data(null)
      .build();
  }

  @Operation(summary = "Delete user", description = "API delete user to database")
  @DeleteMapping("/delete/{userId}")
  public ApiResponse deleteUser(@PathVariable Long userId) {
    log.info("DELETE /user/{}", userId);

    userService.delete(userId);

    return ApiResponse.builder()
      .status(200)
      .message("Xóa user thành công")
      .data(null)
      .build();
  }
}
