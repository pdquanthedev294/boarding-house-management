package vn.backend.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.backend.backend.dto.request.auth.SignInRequest;
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
  public ApiResponse getAccessToken(@RequestBody SignInRequest request) {
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
  public TokenResponse getRefreshToken(@RequestBody String refreshToken) {
    log.info("Refresh token request");
    return TokenResponse.builder().accessToken("DUMMY-NEW-ACCESS-TOKEN").refreshToken("DUMMY-REFRESH-TOKEN").build();
  }
}
