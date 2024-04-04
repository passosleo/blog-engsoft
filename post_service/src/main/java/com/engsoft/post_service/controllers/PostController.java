package com.engsoft.post_service.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.engsoft.post_service.dtos.CreatePostDTO;
import com.engsoft.post_service.dtos.PostDTO;
import com.engsoft.post_service.dtos.UpdatePostDTO;
import com.engsoft.post_service.entities.PostEntity;
import com.engsoft.post_service.repositories.PostRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

  @Autowired
  private PostRepository repository;

  @PostMapping
  @Transactional
  public void createPost(@RequestBody @Valid CreatePostDTO postData) {
    repository.save(new PostEntity(postData));
  }

  @GetMapping
  public Page<PostDTO> getPosts(
      @PageableDefault(size = 10, direction = Direction.DESC, sort = "createdAt") Pageable pageable) {
    return repository.findAll(pageable).map(PostDTO::fromEntity);
  }

  @PutMapping("/{postId}")
  @Transactional
  public void updatePost(@PathVariable(required = true) String postId, @RequestBody @Valid UpdatePostDTO postData) {
    PostEntity post = repository.findByPostId(postId);

    if (post != null) {
      post.updateEntity(postData);
      repository.save(post);
    }
  }
}
