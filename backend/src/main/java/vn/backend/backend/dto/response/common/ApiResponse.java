package vn.backend.backend.dto.response.common;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class ApiResponse<T> {
  private int status;
  private String message;
  private transient T data;
}
