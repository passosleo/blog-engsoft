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
  Page<PostEntity> findAllByAuthorEmail(String authorEmail, Pageable pageable);
}
