package vn.backend.backend.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import vn.backend.backend.repository.UserRepository;

@Service
public record UserServiceDetail(UserRepository userRepository) {
  public UserDetailsService userServiceDetail() {
    return userRepository::findByUsername;
  }
}