package vn.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.backend.backend.entities.RoomImageEntity;

public interface RoomImageRepository extends JpaRepository<RoomImageEntity, Long> {
}