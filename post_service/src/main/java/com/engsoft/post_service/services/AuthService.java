package com.engsoft.post_service.services;

import com.engsoft.post_service.dtos.auth.AccountDTO;
import com.engsoft.post_service.utils.request.RequestHandler;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AuthService {
    private RequestHandler requestHandler;

    public AuthService() {
        this.requestHandler = new RequestHandler("http://localhost:3000");
    }

    public AccountDTO validateToken(String token) {
        var response = requestHandler.post("/api/v1/validate-token", "Authorization", "Bearer " + token);

        if (response == null || response.getStatusCode() != 200) {
            return null;
        }

        JsonObject data = JsonParser.parseString(response.getBody()).getAsJsonObject().get("data").getAsJsonObject();

        return AccountDTO.fromJson(data);
    }
}
