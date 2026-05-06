package vn.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.backend.backend.entities.BuildingEntity;

public interface BuildingRepository extends JpaRepository<BuildingEntity, Long> {
}
