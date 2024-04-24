package com.engsoft.post_service.services;

import com.engsoft.post_service.dtos.auth.AccountDTO;
import com.engsoft.post_service.dtos.posts.CreatePostDTO;
import com.engsoft.post_service.dtos.posts.PostDTO;
import com.engsoft.post_service.dtos.posts.UpdatePostDTO;
import com.engsoft.post_service.entities.CategoryEntity;
import com.engsoft.post_service.entities.PostEntity;
import com.engsoft.post_service.repositories.CategoryRepository;
import com.engsoft.post_service.repositories.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Page<PostDTO> getPosts(Pageable pageable, AccountDTO userAccount) {
        if (userAccount != null) {
            log.info("User email: {}", userAccount.email());
            return postRepository.findAll(pageable).map(PostDTO::fromEntity);
        }
        log.info("User account: {}", userAccount);

        return postRepository.findAllByIsPublicTrue(pageable).map(PostDTO::fromEntity);
    }

    @Transactional
    public void createPost(CreatePostDTO postData, AccountDTO userAccount) {
        CategoryEntity category = categoryRepository.findByCategoryId(postData.categoryId());

        if (category != null) {
            postRepository.save(PostEntity.builder()
                    .title(postData.title())
                    .content(postData.content())
                    .categoryId(postData.categoryId())
                    .isPublic(postData.isPublic())
                    .authorEmail(userAccount.email())
                    .authorName(userAccount.name())
                    .build());
        }
    }

    @Transactional
    public void updatePost(String postId, UpdatePostDTO postData, AccountDTO userAccount) {
        PostEntity post = postRepository.findByPostId(postId);
        CategoryEntity category = categoryRepository.findByCategoryId(postData.categoryId());

        if (post != null && category != null && post.getAuthorEmail().equals(userAccount.email())) {
            post.updateEntity(postData);
            postRepository.save(post);
        }
    }

    @Transactional
    public void deletePost(String postId, AccountDTO userAccount) {
        PostEntity post = postRepository.findByPostId(postId);

        if (post != null && post.getAuthorEmail().equals(userAccount.email())) {
            postRepository.delete(post);
        }
    }
}