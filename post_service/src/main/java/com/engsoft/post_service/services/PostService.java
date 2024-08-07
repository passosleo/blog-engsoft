package com.engsoft.post_service.services;

import com.engsoft.post_service.dtos.auth.AccountDTO;
import com.engsoft.post_service.dtos.posts.CreatePostDTO;
import com.engsoft.post_service.dtos.posts.PostDTO;
import com.engsoft.post_service.dtos.posts.UpdatePostDTO;
import com.engsoft.post_service.entities.CategoryEntity;
import com.engsoft.post_service.entities.PostEntity;
import com.engsoft.post_service.exceptions.NotFoundException;
import com.engsoft.post_service.exceptions.UnauthorizedException;
import com.engsoft.post_service.repositories.CategoryRepository;
import com.engsoft.post_service.repositories.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Page<PostDTO> getPosts(Pageable pageable, String categoryId, String authorEmail, AccountDTO userAccount) {
        if (userAccount != null) {
            return postRepository.findAllByCategoryIdAndAuthorEmailOrAll(pageable, categoryId, authorEmail).map(PostDTO::fromEntity);
        }
        return postRepository.findAllByCategoryIdAndIsPublicTrueOrAllByIsPublicTrue(pageable, categoryId).map(PostDTO::fromEntity);
    }

    @Transactional
    public PostDTO createPost(CreatePostDTO postData, AccountDTO userAccount) {
        CategoryEntity category = categoryRepository.findByCategoryId(postData.categoryId());

        if (category == null) {
           throw new NotFoundException();
        }

        PostEntity createdPost = postRepository.save(PostEntity.builder()
                .title(postData.title())
                .content(postData.content())
                .categoryId(postData.categoryId())
                .isPublic(postData.isPublic())
                .authorEmail(userAccount.email())
                .authorName(userAccount.name())
                .build());

        createdPost.setCategory(category);

        return PostDTO.fromEntity(createdPost);
    }

    @Transactional
    public PostDTO updatePost(String postId, UpdatePostDTO postData, AccountDTO userAccount) {
        PostEntity post = postRepository.findByPostId(postId);
        CategoryEntity category = categoryRepository.findByCategoryId(postData.categoryId());

        if (post == null || category == null) {
            throw new NotFoundException();
        }

        if (!post.getAuthorEmail().equals(userAccount.email())) {
            throw new UnauthorizedException();
        }

        post.updateEntity(postData);
        PostEntity updatedPost = postRepository.save(post);
        updatedPost.setCategory(category);

        return PostDTO.fromEntity(updatedPost);
    }

    @Transactional
    public void deletePost(String postId, AccountDTO userAccount) {
        PostEntity post = postRepository.findByPostId(postId);

        if (post == null) {
            throw new NotFoundException();
        }

        if (!post.getAuthorEmail().equals(userAccount.email())) {
            throw new UnauthorizedException();
        }

        postRepository.delete(post);
    }
}
