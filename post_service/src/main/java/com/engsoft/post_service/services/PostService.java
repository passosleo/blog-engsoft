package com.engsoft.post_service.services;

import com.engsoft.post_service.dtos.posts.CreatePostDTO;
import com.engsoft.post_service.dtos.posts.PostDTO;
import com.engsoft.post_service.dtos.posts.UpdatePostDTO;
import com.engsoft.post_service.entities.PostEntity;
import com.engsoft.post_service.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Page<PostDTO> getPosts(Pageable pageable) {
        return postRepository.findAll(pageable).map(PostDTO::fromEntity);
    }

    @Transactional
    public void createPost(CreatePostDTO postData) {
        postRepository.save(new PostEntity(postData));
    }

    @Transactional
    public void updatePost(String postId, UpdatePostDTO postData) {
        PostEntity post = postRepository.findByPostId(postId);

        if (post != null) {
            post.updateEntity(postData);
            postRepository.save(post);
        }
    }

    @Transactional
    public void deletePost(String postId) {
        PostEntity post = postRepository.findByPostId(postId);

        if (post != null) {
            postRepository.delete(post);
        }
    }
}
