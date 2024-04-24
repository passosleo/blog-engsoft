package com.engsoft.post_service.dtos.posts;

import jakarta.validation.constraints.*;

public record CreatePostDTO(
        @NotBlank String title,
        @NotBlank String content,
        @NotBlank String authorEmail,
        @NotBlank String authorName,
        @NotNull String categoryId) {
}
