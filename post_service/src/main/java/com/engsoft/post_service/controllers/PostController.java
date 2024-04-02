package com.engsoft.post_service.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.engsoft.post_service.dtos.PostDTO;
import com.engsoft.post_service.entities.PostEntity;
import com.engsoft.post_service.repositories.PostRepository;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

  @Autowired
  private PostRepository repository;

  @PostMapping
  public void createPost(@RequestBody PostDTO postData) {
    repository.save(new PostEntity(postData));
  }
}
