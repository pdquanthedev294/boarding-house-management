package vn.backend.backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.backend.backend.dto.response.room.RoomResponse;
import vn.backend.backend.entities.RoomEntity;
import vn.backend.backend.enums.RoomStatus;
import vn.backend.backend.repository.RoomRepository;
import vn.backend.backend.service.RoomService;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "ROOM-SERVICE")
public class RoomServiceImpl implements RoomService {

  private final RoomRepository roomRepository;

  @Override
  public Page<RoomResponse> getAllRooms(Pageable pageable) {
    log.info("Fetching all rooms with pagination: page={}, size={}", 
      pageable.getPageNumber(), pageable.getPageSize());
    
    return roomRepository.findAll(pageable)
      .map(this::mapToResponse);
  }

  @Override
  public Page<RoomResponse> getRoomsByBuilding(Long buildingId, Pageable pageable) {
    log.info("Fetching rooms by building: buildingId={}, page={}, size={}",
      buildingId, pageable.getPageNumber(), pageable.getPageSize());
    
    return roomRepository.findAllByBuildingId(buildingId, pageable)
      .map(this::mapToResponse);
  }

  @Override
  public Page<RoomResponse> getRoomsByStatus(RoomStatus status, Pageable pageable) {
    log.info("Fetching rooms by status: status={}, page={}, size={}",
      status, pageable.getPageNumber(), pageable.getPageSize());
    
    return roomRepository.findAllByStatus(status, pageable)
      .map(this::mapToResponse);
  }

  @Override
  public RoomResponse getRoomById(Long id) {
    log.info("Fetching room by id: {}", id);
    
    RoomEntity room = roomRepository.findById(id)
      .orElseThrow(() -> {
        log.warn("Room not found with id: {}", id);
        return new RuntimeException("Phòng không tồn tại");
      });
    
    return mapToResponse(room);
  }

  private RoomResponse mapToResponse(RoomEntity entity) {
    return RoomResponse.builder()
      .id(entity.getId())
      .roomNumber(entity.getRoomNumber())
      .area(entity.getArea())
      .price(entity.getPrice())
      .maxPeople(entity.getMaxPeople())
      .status(entity.getStatus())
      .electricPrice(entity.getElectricPrice())
      .waterPrice(entity.getWaterPrice())
      .buildingId(entity.getBuilding() != null ? entity.getBuilding().getId() : null)
      .buildingName(entity.getBuilding() != null ? entity.getBuilding().getName() : null)
      .managerId(entity.getManager() != null ? entity.getManager().getId() : null)
      .managerName(entity.getManager() != null ? entity.getManager().getFirstName() : null)
      .build();
  }
}
