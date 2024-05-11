package com.engsoft.post_service.utils.request;

import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Slf4j
@AllArgsConstructor
public class RequestHandler {
    private final HttpClient client;
    private String baseUrl;

    public RequestHandler(String baseUrl) {
        this.client = HttpClient.newHttpClient();
        this.baseUrl = baseUrl;
    }

    public RequestHandlerResponse post(String uri, String... headers) {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + uri))
                .headers(headers)
                .header("Content-Type", "application/json")
                .method("POST", HttpRequest.BodyPublishers.noBody())
                .build();

        try {
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return RequestHandlerResponse.builder()
                    .statusCode(response.statusCode())
                    .body(response.body())
                    .build();
        } catch (IOException | InterruptedException e) {
            log.error("Error: {}", e.getMessage());
            return null;
        }
    }
}
