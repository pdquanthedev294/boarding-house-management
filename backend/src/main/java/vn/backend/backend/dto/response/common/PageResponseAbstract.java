package vn.backend.backend.dto.response.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class PageResponseAbstract {
  public int pageNumber;
  public int pageSize;
  public long totalPages;
  public long totalElements;
}
