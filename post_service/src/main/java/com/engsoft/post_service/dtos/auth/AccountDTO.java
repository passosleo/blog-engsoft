package com.engsoft.post_service.dtos.auth;

import com.google.gson.JsonObject;

import java.time.LocalDateTime;


public record AccountDTO(
        String userId,
        String name,
        boolean emailVerified,
        boolean isEnabled,
        String createdAt,
        String updatedAt) {

    public static AccountDTO fromJson(JsonObject jsonObject) {
        return new AccountDTO(
            jsonObject.get("userId").getAsString(),
            jsonObject.get("name").getAsString(),
            jsonObject.get("emailVerified").getAsBoolean(),
            jsonObject.get("isEnabled").getAsBoolean(),
            jsonObject.get("createdAt").getAsString(),
            jsonObject.get("updatedAt").getAsString()
        );
    }
}