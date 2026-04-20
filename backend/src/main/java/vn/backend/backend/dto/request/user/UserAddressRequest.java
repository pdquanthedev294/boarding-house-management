package vn.backend.backend.dto.request.user;

import lombok.Getter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@ToString
public class UserAddressRequest implements Serializable {
  private String apartmentNumber;
  private String floor;
  private String building;
  private String streetNumber;
  private String street;
  private String city;
  private String country;
  private Integer addressType;
}
