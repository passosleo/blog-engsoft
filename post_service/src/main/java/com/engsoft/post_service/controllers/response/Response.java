package com.engsoft.post_service.controllers.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.http.HttpStatus;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Response<T> {
    @Schema(description = "HTTP status code", example = "200")
    private int status;
    @Schema(description = "HTTP status message", example = "OK")
    private String message;
    private T data;

    public Response(HttpStatus status, String message, T data) {
        this.status = status.value();
        this.message = message;
        this.data = data;
    }

    public Response(HttpStatus status, T data) {
        this.status = status.value();
        this.message = status.getReasonPhrase();
        this.data = data;
    }

    public static <T> Response<T> of(HttpStatus status, String message, T data) {
        return new Response<>(status, message, data);
    }

    public static <T> Response<T> of(HttpStatus status, T data) {
        return new Response<>(status, data);
    }
}
