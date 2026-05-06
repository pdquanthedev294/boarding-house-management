package vn.backend.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.backend.backend.dto.request.room.CreateRoomRequest;
import vn.backend.backend.dto.request.room.UpdateRoomRequest;
import vn.backend.backend.dto.response.room.RoomResponse;
import vn.backend.backend.entities.BuildingEntity;
import vn.backend.backend.entities.RoomEntity;
import vn.backend.backend.entities.UserEntity;
import vn.backend.backend.enums.RoomStatus;
import vn.backend.backend.exception.ResourceNotFoundException;
import vn.backend.backend.mapper.RoomMapper;
import vn.backend.backend.repository.BuildingRepository;
import vn.backend.backend.repository.RoomRepository;
import vn.backend.backend.repository.UserRepository;
import vn.backend.backend.service.RoomService;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "ROOM-SERVICE")
public class RoomServiceImpl implements RoomService {

  private final RoomRepository roomRepository;
  private final BuildingRepository buildingRepository;
  private final UserRepository userRepository;
  private final RoomMapper roomMapper;

  @Override
  public Page<RoomResponse> getAllRooms(Pageable pageable) {
    log.info("Fetching all rooms with pagination: page={}, size={}", pageable.getPageNumber(), pageable.getPageSize());
    return roomRepository.findAll(pageable)
      .map(roomMapper::toResponse);
  }

  @Override
  public Page<RoomResponse> getRoomsByBuilding(Long buildingId, Pageable pageable) {
    log.info("Fetching rooms by building: buildingId={}, page={}, size={}",
      buildingId, pageable.getPageNumber(), pageable.getPageSize());

    return roomRepository.findAllByBuildingId(buildingId, pageable)
      .map(roomMapper::toResponse);
  }

  @Override
  public Page<RoomResponse> getRoomsByStatus(RoomStatus status, Pageable pageable) {
    log.info("Fetching rooms by status: status={}, page={}, size={}",
      status, pageable.getPageNumber(), pageable.getPageSize());

    return roomRepository.findAllByStatus(status, pageable)
      .map(roomMapper::toResponse);
  }

  @Override
  public RoomResponse getRoomById(Long id) {
    log.info("Fetching room by id: {}", id);

    RoomEntity room = roomRepository.findById(id)
      .orElseThrow(() -> {
        log.warn("Room not found with id: {}", id);
        return new RuntimeException("Phòng không tồn tại");
      });

    return roomMapper.toResponse(room);
  }

  @Override
  public RoomResponse createRoom(CreateRoomRequest request) {
    log.info("Creating room: {}", request.getRoomNumber());

    BuildingEntity building = buildingRepository.findById(request.getBuildingId())
      .orElseThrow(() -> new ResourceNotFoundException("Tòa nhà không tồn tại"));

    UserEntity manager = null;

    if (request.getManagerId() != null) {
      manager = userRepository.findById(request.getManagerId())
        .orElseThrow(() -> new ResourceNotFoundException("Người quản lý không tồn tại"));
    }

    RoomEntity room = roomMapper.toEntity(request, building, manager);

    return roomMapper.toResponse(roomRepository.save(room));
  }

  @Override
  public RoomResponse updateRoom(Long id, UpdateRoomRequest request) {
    log.info("Updating room id={}", id);

    RoomEntity room = findRoomById(id);

    BuildingEntity building = buildingRepository.findById(request.getBuildingId())
      .orElseThrow(() -> new ResourceNotFoundException("Tòa nhà không tồn tại"));

    UserEntity manager = null;

    if (request.getManagerId() != null) {
      manager = userRepository.findById(request.getManagerId())
        .orElseThrow(() -> new ResourceNotFoundException("Người quản lý không tồn tại"));
    }

    roomMapper.updateEntity(request, room, building, manager);

    return roomMapper.toResponse(roomRepository.save(room));
  }

  private RoomEntity findRoomById(Long id) {
    return roomRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Phòng không tồn tại với id: " + id));
  }

  @Override
  public void deleteRoom(Long id) {
    log.info("Deleting room id={}", id);
    RoomEntity room = findRoomById(id);
    roomRepository.delete(room);
  }

}
