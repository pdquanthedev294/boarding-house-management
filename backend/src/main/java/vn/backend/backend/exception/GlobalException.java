package vn.backend.backend.exception;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.ConstraintViolationException;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestControllerAdvice
public class GlobalException {
  /*
  * Handle exception when validate data
  * @param e
  * @param request
  * @return errorResponse
  * */
  @ExceptionHandler({ConstraintViolationException.class,
    MissingServletRequestParameterException.class, MethodArgumentNotValidException.class})
  @ApiResponses(value = {
    @ApiResponse(responseCode = "400", description = "Bad Request",
      content = {@Content(mediaType = APPLICATION_JSON_VALUE,
        examples = @ExampleObject(
          name = "Handle exception when the data invalid. @RequestBody",
          summary = "Handle Bad Request",
          value = """
                                        {
                                            "timestamp": "2024-04-07T11:38:56.368+00:00",
                                            "status": 400,
                                            "path": "/api/v1/...",
                                            "error": "Invalid Payload",
                                            "message": "{data} must be not blank"
                                        }
                                        """
        ))})
  })
  public ErrorResponse handleValidationException(Exception e, WebRequest request) {
    ErrorResponse errorResponse = new ErrorResponse();
    errorResponse.setTimestamp(new Date());
    errorResponse.setStatus(BAD_REQUEST.value());
    errorResponse.setPath(request.getDescription(false).replace("uri=", ""));

    String message = e.getMessage();
    if (e instanceof MethodArgumentNotValidException) {
      int start = message.lastIndexOf("[") + 1;
      int end = message.lastIndexOf("]") - 1;
      message = message.substring(start, end);
      errorResponse.setError("Invalid Payload");
      errorResponse.setMessage(message);
    } else if (e instanceof MissingServletRequestParameterException) {
      errorResponse.setError("Invalid Parameter");
      errorResponse.setMessage(message);
    } else if (e instanceof ConstraintViolationException) {
      errorResponse.setError("Invalid Parameter");
      errorResponse.setMessage(message.substring(message.indexOf(" ") + 1));
    } else {
      errorResponse.setError("Invalid Data");
      errorResponse.setMessage(message);
    }
    return errorResponse;
  }

  /*
  * Handle exception when internal server error
  * @param e
  * @param request
  * @return error
  * */
  @ExceptionHandler(Exception.class)
  @ApiResponses(value = {
    @ApiResponse(responseCode = "500", description = "Internal Server Error",
      content = {@Content(mediaType = APPLICATION_JSON_VALUE,
        examples = @ExampleObject(
          name = "500 Response",
          summary = "Handle exception when internal server error",
          value = """
                                        {
                                          "timestamp": "2023-10-19T06:35:52.333+00:00",
                                          "status": 500,
                                          "path": "/api/v1/...",
                                          "error": "Internal Server Error",
                                          "message": "Connection timeout, please try again"
                                        }
                                        """
        ))}
    )
  })
  public ErrorResponse handleException(Exception e, WebRequest request) {
    ErrorResponse errorResponse = new ErrorResponse();
    errorResponse.setTimestamp(new Date());
    errorResponse.setPath(request.getDescription(false).replace("uri=", ""));
    errorResponse.setStatus(INTERNAL_SERVER_ERROR.value());
    errorResponse.setError(INTERNAL_SERVER_ERROR.getReasonPhrase());
    errorResponse.setMessage(e.getMessage());
    return errorResponse;
  }

  /*
   * Handle exception when the request not found data
   * */
  @ExceptionHandler({AccessDeniedException.class, ForbiddenException.class})
  @ApiResponses(value = {
    @ApiResponse(responseCode = "403", description = "FORBIDDEN",
      content = {@Content(mediaType = APPLICATION_JSON_VALUE,
        examples = @ExampleObject(
          name = "403 Response",
          summary = "Handle exception when Forbidden",
          value = """
                {
                    "timestamp": "2023-10-19T06:07:35.321+00:00",
                    "status": 403,
                    "path": "/api/v1/...",
                    "error": "FORBIDDEN",
                    "message": "Access is denied"
                }
                """
        )
      )}
    )
  })
  public ErrorResponse handleAccessDeniedException(Exception e, WebRequest request) {

    ErrorResponse errorResponse = new ErrorResponse();
    errorResponse.setTimestamp(new Date());
    errorResponse.setPath(request.getDescription(false).replace("uri=", ""));
    errorResponse.setStatus(FORBIDDEN.value());
    errorResponse.setError(FORBIDDEN.getReasonPhrase());
    errorResponse.setMessage(e.getMessage());

    return errorResponse;
  }

  @Getter
  @Setter
  public static class ErrorResponse {
    private Date timestamp;
    private int status;
    private String path;
    private String error;
    private String message;
  }
}
