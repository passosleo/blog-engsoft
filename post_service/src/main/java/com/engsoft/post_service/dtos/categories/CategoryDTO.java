package com.engsoft.post_service.dtos.categories;

import java.time.LocalDateTime;

import com.engsoft.post_service.entities.CategoryEntity;

public record CategoryDTO(
        String categoryId,
        String name,
        String color,
        boolean isEnabled,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {

    public static CategoryDTO fromEntity(CategoryEntity categoryEntity) {
        return new CategoryDTO(
                categoryEntity.getCategoryId(),
                categoryEntity.getName(),
                categoryEntity.getColor(),
                categoryEntity.isEnabled(),
                categoryEntity.getCreatedAt(),
                categoryEntity.getUpdatedAt());
    }
}
