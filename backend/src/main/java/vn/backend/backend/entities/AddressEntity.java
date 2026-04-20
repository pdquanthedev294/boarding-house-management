package vn.backend.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import vn.backend.backend.enums.AddressType;

@Entity
@Table(name = "tbl_address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressEntity extends Abstract<Long> {

  @Column(name = "apartment_number")
  private String apartmentNumber;

  @Column(name = "floor")
  private String floor;

  @Column(name = "building")
  private String building;

  @Column(name = "street_number")
  private String streetNumber;

  @Column(name = "street")
  private String street;

  @Column(name = "city")
  private String city;

  @Column(name = "country")
  private String country;

  @Enumerated(EnumType.ORDINAL)
  @Column(name = "address_type")
  private AddressType addressType;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private UserEntity user;
}
