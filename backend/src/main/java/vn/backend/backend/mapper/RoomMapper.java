package vn.backend.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.backend.backend.dto.request.room.CreateRoomRequest;
import vn.backend.backend.dto.request.room.UpdateRoomRequest;
import vn.backend.backend.dto.response.room.RoomResponse;
import vn.backend.backend.entities.BuildingEntity;
import vn.backend.backend.entities.RoomEntity;
import vn.backend.backend.entities.UserEntity;

@Mapper(componentModel = "spring")
public interface RoomMapper {

  // ================= CREATE =================
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)

  @Mapping(target = "roomNumber", source = "req.roomNumber")
  @Mapping(target = "area", source = "req.area")
  @Mapping(target = "price", source = "req.price")
  @Mapping(target = "maxPeople", source = "req.maxPeople")
  @Mapping(target = "status", source = "req.status")
  @Mapping(target = "electricPrice", source = "req.electricPrice")
  @Mapping(target = "waterPrice", source = "req.waterPrice")

  @Mapping(target = "building", source = "building")
  @Mapping(target = "manager", source = "manager")
  RoomEntity toEntity(CreateRoomRequest req,
                      BuildingEntity building,
                      UserEntity manager);

  // ================= UPDATE =================
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)

  @Mapping(target = "roomNumber", source = "req.roomNumber")
  @Mapping(target = "area", source = "req.area")
  @Mapping(target = "price", source = "req.price")
  @Mapping(target = "maxPeople", source = "req.maxPeople")
  @Mapping(target = "status", source = "req.status")
  @Mapping(target = "electricPrice", source = "req.electricPrice")
  @Mapping(target = "waterPrice", source = "req.waterPrice")

  @Mapping(target = "building", source = "building")
  @Mapping(target = "manager", source = "manager")
  void updateEntity(UpdateRoomRequest req,
                    @org.mapstruct.MappingTarget RoomEntity room,
                    BuildingEntity building,
                    UserEntity manager);

  // ================= RESPONSE =================
  @Mapping(target = "buildingId", source = "building.id")
  @Mapping(target = "buildingName", source = "building.name")
  @Mapping(target = "managerId", source = "manager.id")
  @Mapping(target = "managerName", source = "manager.firstName")
  RoomResponse toResponse(RoomEntity entity);
}