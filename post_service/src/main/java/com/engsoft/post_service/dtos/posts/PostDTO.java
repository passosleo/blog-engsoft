package com.engsoft.post_service.dtos.posts;

import java.time.LocalDateTime;

import com.engsoft.post_service.entities.CategoryEntity;
import com.engsoft.post_service.entities.PostEntity;

public record PostDTO(
    String postId,
    String title,
    String content,
    String authorEmail,
    String authorName,
    String categoryId,
    CategoryEntity category,
    boolean isPublic,
    boolean isEdited,
    LocalDateTime createdAt,
    LocalDateTime updatedAt) {

  public static PostDTO fromEntity(PostEntity postEntity) {
    return new PostDTO(
        postEntity.getPostId(),
        postEntity.getTitle(),
        postEntity.getContent(),
        postEntity.getAuthorEmail(),
        postEntity.getAuthorName(),
        postEntity.getCategoryId(),
        postEntity.getCategory(),
        postEntity.isPublic(),
        postEntity.isEdited(),
        postEntity.getCreatedAt(),
        postEntity.getUpdatedAt());
  }
}
