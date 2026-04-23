package vn.backend.backend.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import vn.backend.backend.common.TokenType;
import vn.backend.backend.dto.response.common.ErrorResponse;
import vn.backend.backend.service.JwtService;
import org.springframework.util.AntPathMatcher;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Component
@Slf4j(topic = "CUSTOMIZE-REQUEST-FILTER")
@RequiredArgsConstructor
public class CustomizeRequestFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;
  private static final AntPathMatcher matcher = new AntPathMatcher();

  public static class BypassRule {
    private final String pattern;
    private final String method; // null = all method

    public BypassRule(String pattern, String method) {
      this.pattern = pattern;
      this.method = method;
    }

    public String getPattern() { return pattern; }
    public String getMethod() { return method; }
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    log.info("{} {}", request.getMethod(), request.getRequestId());

    try {
      if (isBypassToken(request)) {
        filterChain.doFilter(request, response);
        return;
      }

      String authHeader = request.getHeader("Authorization");

      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        return;
      }

      String token= authHeader.substring(7);
      log.info("Bearer authHeader: {}", token.substring(0, 20));

      String email = "";
      try {
        email = jwtService.extractEmail(token, TokenType.ACCESS_TOKEN);
        log.info("email: {}", email);
      } catch (AccessDeniedException e) {
        log.error("Access Dined, message={}", e.getMessage());
        writeError(response, request, e.getMessage());
        return;
      }

      UserDetails userDetails = userDetailsService.loadUserByUsername(email);

      // validate token
      if (!jwtService.validateToken(token, TokenType.ACCESS_TOKEN, userDetails)) {
        writeError(response, request, "Invalid or expired token");
        return;
      }

      UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

      authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(authentication);

      filterChain.doFilter(request, response);
    } catch (Exception e) {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
  }


  private static final List<BypassRule> RULES = List.of(
    new BypassRule("/auth/access-token", "POST"),
    new BypassRule("/swagger-ui/**", null),
    new BypassRule("/v3/api-docs/**", null),
    new BypassRule("/auth/**", null)
  );

  private boolean isBypassToken(@NonNull HttpServletRequest request) {
    String path = request.getServletPath();
    String method = request.getMethod();

    return RULES.stream().anyMatch(rule ->
      matcher.match(rule.getPattern(), path) &&
        (rule.getMethod() == null || rule.getMethod().equals(method))
    );
  }

  private void writeError(HttpServletResponse response,
                          HttpServletRequest request,
                          String message) throws IOException {

    ErrorResponse error = new ErrorResponse();
    error.setTimestamp(new Date());
    error.setError("Forbidden");
    error.setPath(request.getRequestURI());
    error.setStatus(HttpServletResponse.SC_FORBIDDEN);
    error.setMessage(message);

    response.setStatus(HttpServletResponse.SC_OK);
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    response.getWriter().write(gson.toJson(error));
  }

}
