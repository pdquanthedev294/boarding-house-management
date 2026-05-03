package vn.backend.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.backend.backend.dto.response.common.ApiResponse;
import vn.backend.backend.dto.response.room.RoomResponse;
import vn.backend.backend.enums.RoomStatus;
import vn.backend.backend.service.RoomService;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
@Slf4j(topic = "ROOM-CONTROLLER")
@Tag(name = "Room Management", description = "Room listing and details endpoints")
public class RoomController {

  private final RoomService roomService;

  @GetMapping("/list")
  public ResponseEntity<ApiResponse<Page<RoomResponse>>> getAllRooms(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
  ) {
    log.info("GET /room/list - page={}, size={}", page, size);
    
    Pageable pageable = PageRequest.of(page, size);
    Page<RoomResponse> rooms = roomService.getAllRooms(pageable);
    
    return ResponseEntity.ok(ApiResponse.<Page<RoomResponse>>builder()
      .status(200)
      .message("Lấy danh sách phòng thành công")
      .data(rooms)
      .build());
  }

  @GetMapping("/building/{buildingId}")
  public ResponseEntity<ApiResponse<Page<RoomResponse>>> getRoomsByBuilding(
    @PathVariable Long buildingId,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
  ) {
    log.info("GET /room/building/{} - page={}, size={}", buildingId, page, size);
    
    Pageable pageable = PageRequest.of(page, size);
    Page<RoomResponse> rooms = roomService.getRoomsByBuilding(buildingId, pageable);
    
    return ResponseEntity.ok(ApiResponse.<Page<RoomResponse>>builder()
      .status(200)
      .message("Lấy danh sách phòng theo tòa nhà thành công")
      .data(rooms)
      .build());
  }

  @GetMapping("/status/{status}")
  public ResponseEntity<ApiResponse<Page<RoomResponse>>> getRoomsByStatus(
    @PathVariable RoomStatus status,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
  ) {
    log.info("GET /room/status/{} - page={}, size={}", status, page, size);
    
    Pageable pageable = PageRequest.of(page, size);
    Page<RoomResponse> rooms = roomService.getRoomsByStatus(status, pageable);
    
    return ResponseEntity.ok(ApiResponse.<Page<RoomResponse>>builder()
      .status(200)
      .message("Lấy danh sách phòng theo trạng thái thành công")
      .data(rooms)
      .build());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<RoomResponse>> getRoomById(@PathVariable Long id) {
    log.info("GET /room/{}", id);
    
    RoomResponse room = roomService.getRoomById(id);
    
    return ResponseEntity.ok(ApiResponse.<RoomResponse>builder()
      .status(200)
      .message("Lấy chi tiết phòng thành công")
      .data(room)
      .build());
  }
}
