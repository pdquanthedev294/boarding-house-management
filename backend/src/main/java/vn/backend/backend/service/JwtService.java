package vn.backend.backend.service;

import org.springframework.security.core.userdetails.UserDetails;
import vn.backend.backend.common.TokenType;

import java.util.List;

public interface JwtService {
  String generateAccessToken(String email, List<String> authorities);

  String generateRefreshToken(String email,List<String> authorities);

  String extractEmail(String token, TokenType type);

  boolean validateToken(String token, TokenType type, UserDetails userDetails);
}
