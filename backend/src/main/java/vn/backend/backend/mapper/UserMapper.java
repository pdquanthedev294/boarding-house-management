package vn.backend.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.backend.backend.dto.request.user.CreateUserRequest;
import vn.backend.backend.dto.request.user.UserAddressRequest;
import vn.backend.backend.entities.AddressEntity;
import vn.backend.backend.entities.UserEntity;
import vn.backend.backend.enums.AddressType;
import vn.backend.backend.enums.Gender;
import vn.backend.backend.enums.UserType;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

  @Mapping(target = "password", ignore = true) // xử lý ở service
  @Mapping(target = "gender", expression = "java(mapGender(req.getGender()))")
  @Mapping(target = "type", expression = "java(mapType(req.getType()))")
  UserEntity toEntity(CreateUserRequest req);

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
