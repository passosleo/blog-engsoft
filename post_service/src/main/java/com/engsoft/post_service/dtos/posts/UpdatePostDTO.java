package com.engsoft.post_service.dtos.posts;

import jakarta.validation.constraints.*;

public record UpdatePostDTO(
        @NotBlank String title,
        @NotBlank String content,
        @NotNull String categoryId,
        @NotNull boolean isPublic
) {
}
