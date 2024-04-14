package com.engsoft.post_service.entities;

import java.time.LocalDateTime;

import com.engsoft.post_service.dtos.PostDTO;
import com.engsoft.post_service.enums.PostCategory;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "posts")
@Entity(name = "Post")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "postId")
public class PostEntity {

  public PostEntity(PostDTO postData) {
    this.title = postData.title();
    this.content = postData.content();
    this.author = postData.author();
    this.category = postData.category();
  }

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "post_id")
  private String postId;

  private String title;

  private String content;

  private String author;

  @Enumerated(EnumType.STRING)
  private PostCategory category;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
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
}
