package com.engsoft.post_service.utils.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class RequestHandlerResponse {
    private int statusCode;
    private String body;
}