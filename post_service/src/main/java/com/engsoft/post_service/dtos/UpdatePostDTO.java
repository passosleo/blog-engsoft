package com.engsoft.post_service.dtos;

import com.engsoft.post_service.enums.PostCategory;

import jakarta.validation.constraints.*;

public record UpdatePostDTO(
        @NotBlank String title,
        @NotBlank String content,
        @NotNull PostCategory category) {
}
