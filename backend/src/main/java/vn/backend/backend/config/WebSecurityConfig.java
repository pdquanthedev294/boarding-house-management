package vn.backend.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {

  private final CustomizeRequestFilter customizeRequestFilter;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .cors(cors -> {})
      .csrf(AbstractHttpConfigurer::disable)
      .sessionManagement(manager ->
        manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      .addFilterBefore(customizeRequestFilter, UsernamePasswordAuthenticationFilter.class)
      .authorizeHttpRequests(request -> request
        .requestMatchers("/auth/**").permitAll()
//        .requestMatchers("/user/**").permitAll()
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
