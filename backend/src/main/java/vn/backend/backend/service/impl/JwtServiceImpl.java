package vn.backend.backend.service.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import vn.backend.backend.common.TokenType;
import vn.backend.backend.exception.InvalidDataException;
import vn.backend.backend.service.JwtService;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

import static vn.backend.backend.common.TokenType.ACCESS_TOKEN;
import static vn.backend.backend.common.TokenType.REFRESH_TOKEN;

@Service
@Slf4j(topic = "JWT-SERVICE")
public class JwtServiceImpl implements JwtService {

  @Value("${jwt.expiryMinutes}")
  private long expiryMinutes;

  @Value("${jwt.expiryDay}")
  private long expiryDay;

  @Value("${jwt.accessKey}")
  private String accessKey;

  @Value("${jwt.refreshKey}")
  private String refreshKey;

  @Override
  public String generateAccessToken(String email, List<String> authorities) {
    log.info("Generate access token for email {} with authorities {}", email, authorities);

    List<String> roles = authorities.stream()
      .filter(Objects::nonNull)
      .map(Object::toString)
      .map(role -> {
        String r = String.valueOf(role).
          replace("[", "").
          replace("]", "")
          .toUpperCase();

        if (r.startsWith("ROLE_")) {
          return r;
        }
        return "ROLE_" + r;
      })
      .distinct()
      .toList();

    Map<String, Object> claims = new HashMap<>();
    claims.put("email", email);
    claims.put("roles", roles);

    return generateToken(claims, email, ACCESS_TOKEN);
  }

  @Override
  public String generateRefreshToken(String email, List<String> authorities) {
    log.info("Generate refresh token for email {} with authorities {}", email, authorities);

    List<String> roles = authorities.stream()
      .filter(Objects::nonNull)
      .map(Object::toString)
      .map(role -> {
        String r = String.valueOf(role)
          .replace("[", "")
          .replace("]", "")
          .toUpperCase();

        if (r.startsWith("ROLE_")) {
          return r;
        }
        return "ROLE_" + r;
      })
      .distinct()
      .toList();

    Map<String, Object> claims = new HashMap<>();
    claims.put("email", email);
    claims.put("roles", roles);

    return generateToken(claims, email, REFRESH_TOKEN);
  }

  @Override
  public String extractEmail(String token, TokenType type) {
    log.info("Extract email from token {} with type {}", token, type);
    return extractClaims(type, token, Claims::getSubject);
  }

  private <T> T extractClaims(TokenType type, String token, Function<Claims, T> claimsExtractor) {
    final Claims claims = extraAllClaim(token, type);
    return claimsExtractor.apply(claims);
  }

  private Claims extraAllClaim(String token, TokenType type) {
    try {
      return Jwts.parser()
        .setSigningKey(getKey(type))
        .parseClaimsJws(token)
        .getBody();
    } catch (SignatureException | ExpiredJwtException e) {
      throw new AccessDeniedException("Access denied!, error: " + e.getMessage());
    }
  }

  private String generateToken(Map<String, Object> claims, String email, TokenType type) {
    log.info("Generate {} token for user {} with claims {}", type, email, claims);

    long expirationMillis = switch (type) {
      case ACCESS_TOKEN -> 1000L * 60 * expiryMinutes;
      case REFRESH_TOKEN -> 1000L * 60 * 60 * 24 * expiryDay;
    };

    return Jwts.builder()
      .setClaims(claims)
      .setSubject(email)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
      .signWith(getKey(type), SignatureAlgorithm.HS256)
      .compact();
  }

  private Key getKey(TokenType type) {
    switch (type) {
      case ACCESS_TOKEN -> {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(accessKey));
      }
      case REFRESH_TOKEN -> {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(refreshKey));
      }
      default -> throw new InvalidDataException("Invalid token type");
    }
  }

  public boolean isTokenExpired(String token, TokenType type) {
    Date expiration = extractClaims(type, token, Claims::getExpiration);
    return expiration.before(new Date());
  }

  @Override
  public boolean validateToken(String token, TokenType type, UserDetails userDetails) {
    String email = extractEmail(token, type);
    return email.equals(userDetails.getUsername()) && !isTokenExpired(token, type);
  }

}
