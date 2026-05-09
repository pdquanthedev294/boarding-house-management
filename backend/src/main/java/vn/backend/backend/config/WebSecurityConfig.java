package vn.backend.backend.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@Slf4j(topic = "WEB-SECURITY-CONFIG")
public class WebSecurityConfig {

  private final CustomizeRequestFilter customizeRequestFilter;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .cors(cors -> {})
      .csrf(AbstractHttpConfigurer::disable)
      .addFilterBefore(customizeRequestFilter, UsernamePasswordAuthenticationFilter.class)
      .sessionManagement(manager ->
        manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      .authorizeHttpRequests(request -> request
        // ================= AUTH =================
        .requestMatchers("/auth/**").permitAll()

        // ================= SWAGGER =================
        .requestMatchers(
          "/swagger-ui/**",
          "/v3/api-docs/**",
          "/webjars/**"
        ).permitAll()

        // ================= ROOM =================
        .requestMatchers(HttpMethod.GET, "/room/**").hasAuthority("VIEW_ROOM")
        .requestMatchers(HttpMethod.POST, "/room/**").hasAuthority("ROOM_CREATE")
        .requestMatchers(HttpMethod.PUT, "/room/**").hasAuthority("ROOM_UPDATE")
        .requestMatchers(HttpMethod.DELETE, "/room/**").hasAuthority("ROOM_DELETE")

        // ================= USER =================
        .requestMatchers(HttpMethod.GET, "/user/**").hasAuthority("USER_VIEW")
        .requestMatchers(HttpMethod.POST, "/user/**").hasAuthority("USER_CREATE")
        .requestMatchers(HttpMethod.PUT, "/user/**").hasAuthority("USER_UPDATE")
        .requestMatchers(HttpMethod.DELETE, "/user/**").hasAuthority("USER_DELETE")

        // ================= ADMIN =================
        .requestMatchers("/admin/**").hasAnyRole("ADMIN", "SYSTEM_ADMIN")

        // ================= ALL =================
        .anyRequest().authenticated()
      );

    return http.build();
  }

  @Bean
  public WebSecurityCustomizer ignoreResources() {
    return web -> web.ignoring()
      .requestMatchers("/actuator/**", "/v3/**", "/webjars/**", "/swagger-ui/**");
  }
}
