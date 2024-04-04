package com.engsoft.post_service.dtos;

import java.time.LocalDateTime;

import com.engsoft.post_service.entities.PostEntity;
import com.engsoft.post_service.enums.PostCategory;

public record PostDTO(
    String postId,
    String title,
    String content,
    String author,
    PostCategory category,
    LocalDateTime createdAt,
    LocalDateTime updatedAt) {

  // Alternative constructor
  // public PostDTO(PostEntity postEntity) {
  // this(postEntity.getPostId(),
  // postEntity.getTitle(),
  // postEntity.getContent(),
  // postEntity.getAuthor(),
  // postEntity.getCategory(),
  // postEntity.getCreatedAt(),
  // postEntity.getUpdatedAt());
  // }

  public static PostDTO fromEntity(PostEntity postEntity) {
    return new PostDTO(
        postEntity.getPostId(),
        postEntity.getTitle(),
        postEntity.getContent(),
        postEntity.getAuthor(),
        postEntity.getCategory(),
        postEntity.getCreatedAt(),
        postEntity.getUpdatedAt());
  }

}
