package vn.backend.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.backend.backend.dto.request.auth.SignUpRequest;
import vn.backend.backend.dto.request.user.CreateUserRequest;
import vn.backend.backend.dto.request.user.UserAddressRequest;
import vn.backend.backend.dto.response.user.UserResponse;
import vn.backend.backend.entities.AddressEntity;
import vn.backend.backend.entities.UserEntity;
import vn.backend.backend.enums.AddressType;
import vn.backend.backend.enums.Gender;
import vn.backend.backend.enums.UserType;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

  // ===== REGISTER =====
  @Mapping(target = "password", ignore = true)
  @Mapping(target = "gender", ignore = true)
  @Mapping(target = "type", ignore = true)
  @Mapping(target = "status", constant = "ACTIVE")
  UserEntity toEntity(SignUpRequest req);

  // ===== ADMIN CREATE =====
  @Mapping(target = "password", ignore = true) // xử lý ở service
  @Mapping(target = "gender", expression = "java(mapGender(req.getGender()))")
  @Mapping(target = "type", expression = "java(mapType(req.getType()))")
  UserEntity toEntity(CreateUserRequest req);

  // ================= RESPONSE =================
  @Mapping(target = "id", source = "id")
  @Mapping(target = "firstName", source = "firstName")
  @Mapping(target = "lastName", source = "lastName")
  @Mapping(target = "username", source = "username")
  @Mapping(target = "email", source = "email")
  @Mapping(target = "phone", source = "phone")
  @Mapping(target = "gender", source = "gender")
  @Mapping(target = "type", source = "type")
  @Mapping(target = "status", source = "status")
  UserResponse toResponse(UserEntity user);

  List<AddressEntity> toAddressEntities(List<UserAddressRequest> addresses);

  // ===== CUSTOM =====
  default Gender mapGender(String gender) {
    return gender != null ? Gender.valueOf(gender.toUpperCase()) : null;
  }

  default UserType mapType(String type) {
    return type != null ? UserType.valueOf(type.toUpperCase()) : null;
  }

  default AddressType map(Integer value) {
    return value != null ? AddressType.values()[value] : null;
  }
}
