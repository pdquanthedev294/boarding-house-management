package vn.backend.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.backend.backend.dto.request.user.UserAddressRequest;
import vn.backend.backend.dto.request.user.ChangePasswordRequest;
import vn.backend.backend.dto.request.user.CreateUserRequest;
import vn.backend.backend.dto.request.user.UpdateUserRequest;
import vn.backend.backend.dto.response.user.UserResponse;
import vn.backend.backend.entities.AddressEntity;
import vn.backend.backend.entities.RoleEntity;
import vn.backend.backend.entities.UserEntity;
import vn.backend.backend.entities.UserHasRoleEntity;
import vn.backend.backend.enums.UserStatus;
import vn.backend.backend.exception.InvalidDataException;
import vn.backend.backend.exception.ResourceNotFoundException;
import vn.backend.backend.mapper.UserMapper;
import vn.backend.backend.repository.AddressRepository;
import vn.backend.backend.repository.RoleRepository;
import vn.backend.backend.repository.UserHasRoleRepository;
import vn.backend.backend.repository.UserRepository;
import vn.backend.backend.service.UserService;

import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j(topic = "USER-SERVICE")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final AddressRepository addressRepository;
  private final PasswordEncoder passwordEncoder;
  private final UserMapper userMapper;
  private final RoleRepository roleRepository;
  private final UserHasRoleRepository userHasRoleRepository;

  @Override
  public Page<UserResponse> findAll(Pageable pageable) {
    log.info("Get all users");

    return userRepository.findAll(pageable)
      .map(userMapper::toResponse);
  }

  @Override
  public UserResponse findById(Long id) {
    log.info("Find user by id: {}", id);

    UserEntity user = getUserEntity(id);

    return userMapper.toResponse(user);
  }

  @Override
  public UserResponse findByUsername(String username) {

    UserEntity user = userRepository.findByUsername(username);

    return userMapper.toResponse(user);
  }

  @Override
  public UserResponse findByEmail(String email) {
    UserEntity user = userRepository.findByEmail(email)
      .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    return userMapper.toResponse(user);
  }

  @Override
  @Transactional(rollbackFor = Exception.class)
  public long save(CreateUserRequest req) {
    log.info("Saving user: {}", req.getEmail());

    // 1. Validate
    if (userRepository.findByEmail(req.getEmail()).isPresent()) {
      throw new InvalidDataException("User with email: " + req.getEmail() + " already exists");
    }

    if (userRepository.findByUsername(req.getUsername()) != null) {
      throw new InvalidDataException("Username đã tồn tại");
    }

    // 2. Mapping User
    UserEntity user = userMapper.toEntity(req);

    // 3. Xử lý business
    user.setPassword(passwordEncoder.encode(req.getPassword().trim()));

    user.setStatus(
      "INACTIVE".equalsIgnoreCase(req.getStatus()) ? UserStatus.INACTIVE : UserStatus.ACTIVE
    );

    // 4. Save user
    userRepository.save(user);
    log.info("Saved user: {}", user);

    // 5. Save user_has_role
    if (req.getRoleIds() != null && !req.getRoleIds().isEmpty()) {
      List<UserHasRoleEntity> userRoles = new ArrayList<>();

      for (Long roleId : req.getRoleIds()) {
        RoleEntity role = roleRepository.findById(roleId)
          .orElseThrow(() -> new RuntimeException("Không tìm thấy role với id = " + roleId));

        UserHasRoleEntity ur = new UserHasRoleEntity();
        ur.setUser(user);
        ur.setRole(role);

        userRoles.add(ur);
      }

      userHasRoleRepository.saveAll(userRoles);

      log.info("Saved user roles: {}", userRoles);
    }

    // 6. Mapping Address
    if (user.getId() != null && req.getAddresses() != null) {
      List<AddressEntity> addresses = userMapper.toAddressEntities(req.getAddresses());

      // nếu có quan hệ user_id thì set ở đây
      addresses.forEach(address -> address.setUser(user));

      addressRepository.saveAll(addresses);

      log.info("Saved addresses: {}", addresses);
    }

    return user.getId();
  }

  @Override
  @Transactional(rollbackFor = Exception.class)
  public void update(UpdateUserRequest req) {
    log.info("Updating user: {}", req);

    UserEntity user = getUserEntity(req.getId());
    user.setFirstName(req.getFirstName());
    user.setLastName(req.getLastName());

    userRepository.save(user);
    log.info("Updated user: {}", user);

    // Save address
    List<AddressEntity> addresses = new ArrayList<>();

    req.getAddresses().forEach((UserAddressRequest address) -> {
      AddressEntity addressEntity = addressRepository.findByUserIdAndAddressType(user.getId(), address.getAddressType());
      if (addressEntity == null) {
        addressEntity = new AddressEntity();
      }

      addressEntity.setApartmentNumber(address.getApartmentNumber());
      addressEntity.setFloor(address.getFloor());

      addresses.add(addressEntity);
    });

    addressRepository.saveAll(addresses);
    log.info("Updated addresses: {}", addresses);
  }

  @Override
  public void changePassword(ChangePasswordRequest req) {
    log.info("Changing password for user: {}", req);

    // Get user by id
    UserEntity user = getUserEntity(req.getId());
    if (req.getPassword().equals(req.getConfirmPassword())) {
      user.setPassword(passwordEncoder.encode(req.getPassword()));
    }

    userRepository.save(user);
    log.info("Changed password for user: {}", req);
  }

  @Override
  public void delete(Long id) {
    log.info("Deleting user: {}", id);

    UserEntity user = getUserEntity(id);
    user.setStatus(UserStatus.INACTIVE);
    userRepository.save(user);
    log.info("Deleted user: {}", user);
  }

  private UserEntity getUserEntity(Long id) {
    return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
  }
}
