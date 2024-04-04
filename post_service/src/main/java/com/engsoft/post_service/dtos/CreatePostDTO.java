package com.engsoft.post_service.dtos;

import com.engsoft.post_service.enums.PostCategory;

import jakarta.validation.constraints.*;

public record CreatePostDTO(
        @NotBlank String title,
        @NotBlank String content,
        @NotBlank String author,
        @NotNull PostCategory category) {
}
