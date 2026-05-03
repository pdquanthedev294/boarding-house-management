package vn.backend.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.backend.backend.dto.response.room.RoomResponse;
import vn.backend.backend.enums.RoomStatus;

public interface RoomService {
  Page<RoomResponse> getAllRooms(Pageable pageable);
  Page<RoomResponse> getRoomsByBuilding(Long buildingId, Pageable pageable);
  Page<RoomResponse> getRoomsByStatus(RoomStatus status, Pageable pageable);
  RoomResponse getRoomById(Long id);
}
