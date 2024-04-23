package com.engsoft.post_service.entities;

import java.time.LocalDateTime;

import com.engsoft.post_service.dtos.CreatePostDTO;
import com.engsoft.post_service.dtos.UpdatePostDTO;
import com.engsoft.post_service.enums.PostCategory;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "Posts")
@Entity(name = "Post")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "postId")
public class PostEntity {

  public PostEntity(CreatePostDTO postData) {
    this.title = postData.title();
    this.content = postData.content();
    this.author = postData.author();
    this.category = postData.category();
  }

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String postId;

  private String title;

  private String content;

  private String author;

  @Enumerated(EnumType.STRING)
  private PostCategory category;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    this.updatedAt = LocalDateTime.now();
  }

  public void updateEntity(UpdatePostDTO postData) {
    if (postData.title() != null) {
      this.title = postData.title();
    }

    if (postData.content() != null) {
      this.content = postData.content();
    }

    if (postData.category() != null) {
      this.category = postData.category();
    }
  }
}
