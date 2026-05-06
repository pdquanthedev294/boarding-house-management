package vn.backend.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.backend.backend.dto.request.auth.*;
import vn.backend.backend.dto.response.auth.TokenResponse;
import vn.backend.backend.dto.response.common.ApiResponse;
import vn.backend.backend.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
@Slf4j(topic = "AUTHENTICATION-CONTROLLER")
@Tag(name = "Authentication Controller")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService authenticationService;

  @Operation(summary = "Access token", description = "Get access token and refresh token by username and password")
  @PostMapping("/access-token")
  public ApiResponse getAccessToken(@Valid @RequestBody SignInRequest request) {
    log.info("Access token request");

    TokenResponse token = authenticationService.getAccessToken(request);
    return ApiResponse.builder()
      .status(200)
      .message("success")
      .data(token)
      .build();
  }

  @Operation(summary = "Refresh token", description = "Get new access token by refresh token")
  @PostMapping("/refresh-token")
  public ApiResponse getRefreshToken(@RequestBody RefreshTokenRequest request) {
    log.info("Refresh token request");
    TokenResponse token = authenticationService.getRefreshToken(request.getRefreshToken());
    return ApiResponse.builder()
      .status(200)
      .message("success")
      .data(token)
      .build();
  }

  @Operation(summary = "Register", description = "Create new user account")
  @PostMapping("/register")
  public ApiResponse register(@Valid @RequestBody SignUpRequest request) {
    log.info("Register request: {}", request.getEmail());

    TokenResponse token = authenticationService.register(request);

    return ApiResponse.builder()
      .status(200)
      .message("Register success")
      .data(token)
      .build();
  }

  @Operation(summary = "Forgot password", description = "Send OTP code to the user's email for password reset")
  @PostMapping("/forgot-password")
  public ApiResponse forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
    log.info("Forgot password request: {}", request.getEmail());

    authenticationService.forgotPassword(request);
    return ApiResponse.builder()
      .status(200)
      .message("OTP has been sent if the email exists")
      .data(null)
      .build();
  }

  @Operation(summary = "Verify OTP", description = "Verify the password reset OTP code")
  @PostMapping("/verify-otp")
  public ApiResponse verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
    log.info("Verify OTP request: {}", request.getEmail());

    authenticationService.verifyOtp(request);
    return ApiResponse.builder()
      .status(200)
      .message("OTP verified")
      .data(null)
      .build();
  }

  @Operation(summary = "Reset password", description = "Reset the user password after OTP verification")
  @PostMapping("/reset-password")
  public ApiResponse resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
    log.info("Reset password request: {}", request.getEmail());

    authenticationService.resetPassword(request);
    return ApiResponse.builder()
      .status(200)
      .message("Password reset successful")
      .data(null)
      .build();
  }
}
