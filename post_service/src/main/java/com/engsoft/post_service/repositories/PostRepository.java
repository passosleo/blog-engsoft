package com.engsoft.post_service.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.engsoft.post_service.entities.PostEntity;
import org.springframework.stereotype.Repository;


@Repository
public interface PostRepository extends JpaRepository<PostEntity, String> {
  PostEntity findByPostId(String postId);
  Page<PostEntity> findAllByIsPublicTrue(Pageable pageable);
  Page<PostEntity> findAllByCategoryIdAndIsPublicTrue(Pageable pageable, String categoryId);
  Page<PostEntity> findAllByCategoryId(Pageable pageable, String categoryId);
  Page<PostEntity> findAllByAuthorEmail(Pageable pageable, String authorEmail);
  Page<PostEntity> findAllByCategoryIdAndAuthorEmail(Pageable pageable, String categoryId, String authorEmail);

  default Page<PostEntity> findAllByCategoryIdAndAuthorEmailOrAll(Pageable pageable, String categoryId, String authorEmail) {
    if (categoryId != null && authorEmail != null) {
      return findAllByCategoryIdAndAuthorEmail(pageable, categoryId, authorEmail);
    } else if (categoryId != null) {
      return findAllByCategoryId(pageable, categoryId);
    } else if (authorEmail != null) {
      return findAllByAuthorEmail(pageable, authorEmail);
    } else {
      return findAll(pageable);
    }
  }

  default Page<PostEntity> findAllByCategoryIdAndIsPublicTrueOrAllByIsPublicTrue(Pageable pageable, String categoryId) {
    if (categoryId != null) {
      return findAllByCategoryIdAndIsPublicTrue(pageable, categoryId);
    } else {
      return findAllByIsPublicTrue(pageable);
    }
  }
}
