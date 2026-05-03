package vn.backend.backend.service;

import vn.backend.backend.dto.request.auth.ForgotPasswordRequest;
import vn.backend.backend.dto.request.auth.ResetPasswordRequest;
import vn.backend.backend.dto.request.auth.SignUpRequest;
import vn.backend.backend.dto.request.auth.SignInRequest;
import vn.backend.backend.dto.request.auth.VerifyOtpRequest;
import vn.backend.backend.dto.response.auth.TokenResponse;

public interface AuthenticationService {
  TokenResponse getAccessToken(SignInRequest request);
  TokenResponse getRefreshToken(String request);
  TokenResponse register(SignUpRequest request);
  void forgotPassword(ForgotPasswordRequest request);
  void verifyOtp(VerifyOtpRequest request);
  void resetPassword(ResetPasswordRequest request);
}
