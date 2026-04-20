package vn.backend.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.backend.backend.dto.request.auth.SignInRequest;
import vn.backend.backend.dto.response.auth.TokenResponse;
import vn.backend.backend.repository.UserRepository;
import vn.backend.backend.service.AuthenticationService;
import vn.backend.backend.service.JwtService;

import org.springframework.security.core.AuthenticationException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "AUTHENTICATION-SERVICE")
public class AuthenticationServiceImpl implements AuthenticationService {
  private final UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;

  @Override
  public TokenResponse getAccessToken(SignInRequest request) {
    log.info("Get access token");

    List<String> authorities= new ArrayList<>();

    try {
      Authentication authenticate = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
          request.getEmail(),
          request.getPassword()
        )
      );

      log.info("isAuthenticated = {}", authenticate.isAuthenticated());
      log.info("Authorities: {}", authenticate.getAuthorities().toString());
      authorities.add(authenticate.getAuthorities().toString());

      // Nếu xác thực thành công, lưu thông tin vào SecurityContext
      SecurityContextHolder.getContext().setAuthentication(authenticate);
    } catch (AuthenticationException e) {
      log.error("Login fail, message={}", e.getMessage());
      throw new AccessDeniedException(e.getMessage());
    }


    String accessToken = jwtService.generateAccessToken(request.getEmail(), authorities);

    return TokenResponse.builder()
      .accessToken(accessToken)
      .build();
  }

  @Override
  public TokenResponse getRefreshToken(String request) {
    return null;
  }
}
