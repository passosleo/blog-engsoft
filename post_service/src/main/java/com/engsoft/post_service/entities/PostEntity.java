package com.engsoft.post_service.entities;

import java.time.LocalDateTime;

import com.engsoft.post_service.dtos.posts.CreatePostDTO;
import com.engsoft.post_service.dtos.posts.UpdatePostDTO;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "posts")
@Entity(name = "Post")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode(of = "postId")
public class PostEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "post_id")
  private String postId;

  @Column(name = "title")
  private String title;

  @Column(name = "content")
  private String content;

  @Column(name = "author_email")
  private String authorEmail;

  @Column(name = "author_name")
  private String authorName;

  @Column(name = "category_id")
  private String categoryId;

  @ManyToOne()
  @JoinColumn(name = "category_id", referencedColumnName = "category_id", nullable = false, insertable = false, updatable = false)
  private CategoryEntity category;

  @Column(name = "is_public")
  private boolean isPublic;

  @Column(name = "is_edited")
  private boolean isEdited;

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

  public void updateEntity(UpdatePostDTO postData) {
    if (postData.title() != null) {
      this.title = postData.title();
    }

    if (postData.content() != null) {
      this.content = postData.content();
    }

    if (postData.categoryId() != null) {
      this.categoryId = postData.categoryId();
    }

    if (postData.isPublic() != this.isPublic) {
      this.isPublic = postData.isPublic();
    }

    this.isEdited = true;
  }
}
