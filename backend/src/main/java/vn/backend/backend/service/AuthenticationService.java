package vn.backend.backend.service;

import vn.backend.backend.dto.request.auth.SignInRequest;
import vn.backend.backend.dto.response.auth.TokenResponse;

public interface AuthenticationService {
  TokenResponse getAccessToken(SignInRequest request);
  TokenResponse getRefreshToken(String request);
}
