package vn.backend.backend.dto.response.user;

import lombok.Getter;
import lombok.Setter;
import vn.backend.backend.dto.response.common.PageResponseAbstract;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
public class UserPageResponse extends PageResponseAbstract implements Serializable {
  private List<UserResponse> users;
}
