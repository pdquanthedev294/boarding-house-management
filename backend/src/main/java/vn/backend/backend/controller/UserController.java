package vn.backend.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

//  @Operation(summary = "Get user list", description = "API retrieve user from db")
//  @GetMapping("/list")
//  public Map<String, Object> getList(@RequestParam(required = false) String keyword, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size, @RequestParam(required = false) String sort) {
//    log.info("Get user list");
//
//    Map<String, Object> result = new LinkedHashMap<>();
//    result.put("status", HttpStatus.OK.value());
//    result.put("message", "User list");
//    result.put("data", userService.findAll(keyword, sort, page, size));
//
//    return result;
//  }

  @Operation(summary = "Get user detail", description = "API retrieve user detail by ID")
  @GetMapping("/{userId}")
  public Map<String, Object> getUserDetail(@PathVariable @Min(value = 1, message = "UserId must be equals or greater than 1") Long userId) {
    log.info("Get user detail by ID: {}", userId);

    Map<String, Object> result = new LinkedHashMap<>();
    result.put("status", HttpStatus.OK.value());
    result.put("message", "user");
    result.put("data", userService.findById(userId));
    return result;
  }

  @Operation(summary = "Create user", description = "API add new user to db")
  @PostMapping("/add")
  public ApiResponse createUser(@RequestBody @Valid CreateUserRequest request) {
    return ApiResponse.builder()
      .status(HttpStatus.CREATED.value())
      .message("User created successfully")
      .data(userService.save(request))
      .build();
  }

  @Operation(summary = "Update user", description = "API update user to db")
  @PutMapping("/upd")
  public Map<String, Object> updateUser(@RequestBody @Valid UpdateUserRequest request) {
    log.info("Update user: {}", request);

    userService.update(request);

    Map<String, Object> result = new LinkedHashMap<>();
    result.put("status", HttpStatus.ACCEPTED.value());
    result.put("message", "User updated successfully");
    result.put("data", "");

    return result;
  }

  @Operation(summary = "Change password", description = "API change password for user to database")
  @PatchMapping("/change-pwd")
  public Map<String, Object> changePassword(@RequestBody ChangePasswordRequest request) {
    log.info("Changing password for user: {}", request);

    userService.changePassword(request);

    Map<String, Object> result = new LinkedHashMap<>();
    result.put("status", HttpStatus.NO_CONTENT.value());
    result.put("message", "Password updated successfully");
    result.put("data", "");

    return result;
  }

  public Map<String, Object> deleteUser(@PathVariable Long userId) {
    log.info("Deleting user: {}", userId);

    userService.delete(userId);

    Map<String, Object> result = new LinkedHashMap<>();
    result.put("status", HttpStatus.RESET_CONTENT.value());
    result.put("message", "User deleted successfully");
    result.put("data", "");

    return result;
  }
}
