package com.engsoft.post_service.dtos.auth;

import com.google.gson.JsonObject;

public record AccountDTO(
        String userId,
        String name,
        String email,
        boolean emailVerified,
        boolean isEnabled,
        String createdAt,
        String updatedAt) {

    public static AccountDTO fromJson(JsonObject jsonObject) {
        return new AccountDTO(
            jsonObject.get("userId").getAsString(),
            jsonObject.get("name").getAsString(),
            jsonObject.get("email").getAsString(),
            jsonObject.get("emailVerified").getAsBoolean(),
            jsonObject.get("isEnabled").getAsBoolean(),
            jsonObject.get("createdAt").getAsString(),
            jsonObject.get("updatedAt").getAsString()
        );
    }
}