package vn.backend.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.backend.backend.dto.request.auth.SignUpRequest;
import vn.backend.backend.dto.request.auth.SignInRequest;
import vn.backend.backend.dto.response.auth.TokenResponse;
import vn.backend.backend.entities.PasswordResetTokenEntity;
import vn.backend.backend.entities.RoleEntity;
import vn.backend.backend.entities.UserEntity;
import vn.backend.backend.entities.UserHasRoleEntity;
import vn.backend.backend.enums.UserStatus;
import vn.backend.backend.exception.InvalidDataException;
import vn.backend.backend.mapper.UserMapper;
import vn.backend.backend.repository.PasswordResetTokenRepository;
import vn.backend.backend.repository.RoleRepository;
import vn.backend.backend.repository.UserHasRoleRepository;
import vn.backend.backend.repository.UserRepository;
import vn.backend.backend.common.TokenType;
import vn.backend.backend.service.AuthenticationService;
import vn.backend.backend.service.EmailService;
import vn.backend.backend.service.JwtService;
import vn.backend.backend.dto.request.auth.ForgotPasswordRequest;
import vn.backend.backend.dto.request.auth.ResetPasswordRequest;
import vn.backend.backend.dto.request.auth.VerifyOtpRequest;

import org.springframework.security.core.AuthenticationException;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "AUTHENTICATION-SERVICE")
public class AuthenticationServiceImpl implements AuthenticationService {
  private final UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;
  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;
  private final RoleRepository roleRepository;
  private final UserHasRoleRepository userHasRoleRepository;
  private final PasswordResetTokenRepository passwordResetTokenRepository;
  private final EmailService emailService;

  private static final int OTP_LENGTH = 6;
  private static final int OTP_EXPIRY_MINUTES = 10;

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
    String refreshToken = jwtService.generateRefreshToken(request.getEmail(), authorities);

    return TokenResponse.builder()
      .accessToken(accessToken)
      .refreshToken(refreshToken)
      .build();
  }

  @Override
  public TokenResponse getRefreshToken(String request) {
    String refreshToken = request;
    if (refreshToken.startsWith("\"") && refreshToken.endsWith("\"")) {
      refreshToken = refreshToken.substring(1, refreshToken.length() - 1);
    }

    String email = jwtService.extractEmail(refreshToken, TokenType.REFRESH_TOKEN);
    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

    if (!jwtService.validateToken(refreshToken, TokenType.REFRESH_TOKEN, userDetails)) {
      throw new AccessDeniedException("Invalid refresh token");
    }

    List<String> authorities = userDetails.getAuthorities().stream()
      .map(GrantedAuthority::getAuthority)
      .toList();

    String accessToken = jwtService.generateAccessToken(email, authorities);
    String newRefreshToken = jwtService.generateRefreshToken(email, authorities);

    return TokenResponse.builder()
      .accessToken(accessToken)
      .refreshToken(newRefreshToken)
      .build();
  }

  @Override
  public void forgotPassword(ForgotPasswordRequest request) {
    String email = request.getEmail().trim().toLowerCase();
    log.info("Forgot password requested for {}", email);

    if (userRepository.findByEmail(email).isEmpty()) {
      log.warn("Forgot password request submitted for non-existing email {}", email);
      return;
    }

    String otp = generateOtp();
    Date expiresAt = Date.from(Instant.now().plus(OTP_EXPIRY_MINUTES, ChronoUnit.MINUTES));

    passwordResetTokenRepository.save(
      PasswordResetTokenEntity.builder()
        .email(email)
        .otp(otp)
        .expiresAt(expiresAt)
        .verified(false)
        .used(false)
        .build()
    );

    emailService.sendPasswordResetOtp(email, otp);
  }

  @Override
  public void verifyOtp(VerifyOtpRequest request) {
    String email = request.getEmail().trim().toLowerCase();
    log.info("Verify OTP for {}", email);

    PasswordResetTokenEntity token = passwordResetTokenRepository
      .findFirstByEmailAndOtpAndUsedFalseAndExpiresAtAfterOrderByCreatedAtDesc(
        email,
        request.getOtp(),
        new Date()
      )
      .orElseThrow(() -> new InvalidDataException("Invalid or expired OTP"));

    token.setVerified(true);
    passwordResetTokenRepository.save(token);
  }

  @Override
  public void resetPassword(ResetPasswordRequest request) {
    String email = request.getEmail().trim().toLowerCase();
    log.info("Reset password for {}", email);

    if (!request.getNewPassword().equals(request.getConfirmPassword())) {
      throw new InvalidDataException("Passwords do not match");
    }

    UserEntity user = userRepository.findByEmail(email)
      .orElseThrow(() -> new InvalidDataException("Email not found"));

    PasswordResetTokenEntity token = passwordResetTokenRepository
      .findFirstByEmailAndVerifiedTrueAndUsedFalseAndExpiresAtAfterOrderByCreatedAtDesc(
        email,
        new Date()
      )
      .orElseThrow(() -> new InvalidDataException("OTP must be verified before resetting password"));

    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
    userRepository.save(user);

    token.setUsed(true);
    passwordResetTokenRepository.save(token);
  }

  private String generateOtp() {
    int min = (int) Math.pow(10, OTP_LENGTH - 1);
    int max = (int) Math.pow(10, OTP_LENGTH) - 1;
    return String.valueOf(min + (int) (Math.random() * (max - min + 1)));
  }

  @Override
  @Transactional(rollbackFor = Exception.class)
  public TokenResponse register(SignUpRequest request) {

    String email = request.getEmail().trim().toLowerCase();

    if (userRepository.existsByEmail(email)) {
      throw new InvalidDataException("Email already exists");
    }

    UserEntity user = userMapper.toEntity(request);

    user.setEmail(email);
    user.setUsername(email);
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setStatus(UserStatus.ACTIVE);

    // 4. save user
    userRepository.save(user);

    // 5. lấy role mặc định
    RoleEntity role = roleRepository.findByName("user")
      .orElseThrow(() -> new RuntimeException("Role USER not found"));

    log.info("Role = {}", role);

    // 6. save user_has_role
    UserHasRoleEntity userRole = new UserHasRoleEntity();
    userRole.setUser(user);
    userRole.setRole(role);

    userHasRoleRepository.save(userRole);

    // 7. tạo token
    List<String> authorities = List.of(role.getName());

    String accessToken = jwtService.generateAccessToken(
      user.getEmail(),
      authorities
    );
    String refreshToken = jwtService.generateRefreshToken(
      user.getEmail(),
      authorities
    );

    return TokenResponse.builder()
      .accessToken(accessToken)
      .refreshToken(refreshToken)
      .build();
  }
}
