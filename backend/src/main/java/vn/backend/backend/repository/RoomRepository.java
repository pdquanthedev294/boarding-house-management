package vn.backend.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.backend.backend.entities.RoomEntity;
import vn.backend.backend.enums.RoomStatus;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Long> {
  Page<RoomEntity> findAllByBuildingId(Long buildingId, Pageable pageable);
  Page<RoomEntity> findAllByStatus(RoomStatus status, Pageable pageable);
  Page<RoomEntity> findAll(Pageable pageable);
}
