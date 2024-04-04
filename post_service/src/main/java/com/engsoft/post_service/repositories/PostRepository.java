package com.engsoft.post_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.engsoft.post_service.entities.PostEntity;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
}
