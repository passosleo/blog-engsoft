package com.engsoft.post_service.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.engsoft.post_service.dtos.PostDTO;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

  @PostMapping
  public void createPost(@RequestBody PostDTO json) {
    System.out.println(json);
  }
}
