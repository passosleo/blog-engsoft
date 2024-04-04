package com.engsoft.post_service.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.engsoft.post_service.dtos.CreatePostDTO;
import com.engsoft.post_service.dtos.PostDTO;
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
  public List<PostDTO> getPosts() {
    return repository.findAll().stream()
        .map(PostDTO::fromEntity).toList();
  }
}
