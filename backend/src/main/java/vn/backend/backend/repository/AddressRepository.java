package vn.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.backend.backend.entities.AddressEntity;
import vn.backend.backend.enums.AddressType;

@Repository
public interface AddressRepository extends JpaRepository<AddressEntity, Long> {
  AddressEntity findByUserIdAndAddressType(Long userId, Integer addressType);
}
