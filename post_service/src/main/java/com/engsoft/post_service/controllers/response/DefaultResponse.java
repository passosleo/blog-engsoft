package com.engsoft.post_service.controllers.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DefaultResponse<T> {
    @Schema(description = "HTTP status code", example = "200")
    private int status;
    @Schema(description = "HTTP status message", example = "OK")
    private String message;
    private T data;
}
