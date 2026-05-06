package vn.backend.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import vn.backend.backend.dto.request.room.CreateRoomRequest;
import vn.backend.backend.dto.request.room.UpdateRoomRequest;
import vn.backend.backend.dto.response.common.ApiResponse;
import vn.backend.backend.enums.RoomStatus;
import vn.backend.backend.service.RoomService;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
@Slf4j(topic = "ROOM-CONTROLLER")
@Tag(name = "Room Management")
public class RoomController {

  private final RoomService roomService;

  @GetMapping("/list")
  public ApiResponse getAllRooms(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size
  ) {
    if (page < 1) page = 1;

    Pageable pageable = PageRequest.of(page - 1, size);

    return ApiResponse.builder()
      .status(200)
      .message("Lấy danh sách phòng thành công")
      .data(roomService.getAllRooms(pageable))
      .build();
  }

  @GetMapping("/building/{buildingId}")
  public ApiResponse getRoomsByBuilding(
    @PathVariable Long buildingId,
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size
  ) {
    if (page < 1) page = 1;

    Pageable pageable = PageRequest.of(page - 1, size);

    return ApiResponse.builder()
      .status(200)
      .message("Lấy danh sách phòng theo tòa nhà thành công")
      .data(roomService.getRoomsByBuilding(buildingId, pageable))
      .build();
  }

  @GetMapping("/status/{status}")
  public ApiResponse getRoomsByStatus(
    @PathVariable RoomStatus status,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
  ) {
    if (page < 1) page = 1;

    Pageable pageable = PageRequest.of(page - 1, size);

    return ApiResponse.builder()
      .status(200)
      .message("Lấy danh sách phòng theo trạng thái thành công")
      .data(roomService.getRoomsByStatus(status, pageable))
      .build();
  }

  @GetMapping("/{id}")
  public ApiResponse getRoomById(@PathVariable Long id) {
    return ApiResponse.builder()
      .status(200)
      .message("Lấy chi tiết phòng thành công")
      .data(roomService.getRoomById(id))
      .build();
  }

  @PostMapping("/create")
  public ApiResponse createRoom(
    @Valid @RequestBody CreateRoomRequest request
  ) {
    log.info("POST /room/create");

    return ApiResponse.builder()
      .status(201)
      .message("Tạo phòng thành công")
      .data(roomService.createRoom(request))
      .build();
  }

  @PatchMapping("/update/{id}")
  public ApiResponse updateRoom(
    @PathVariable Long id,
    @Valid @RequestBody UpdateRoomRequest request
  ) {
    log.info("PATCH /room/update/{}", id);

    return ApiResponse.builder()
      .status(200)
      .message("Cập nhật phòng thành công")
      .data(roomService.updateRoom(id, request))
      .build();
  }

  @DeleteMapping("/delete/{id}")
  public ApiResponse deleteRoom(@PathVariable Long id) {
    log.info("DELETE /room/delete/{}", id);
    roomService.deleteRoom(id);

    return ApiResponse.builder()
      .status(200)
      .message("Xóa phòng thành công")
      .data(null)
      .build();
  }
}