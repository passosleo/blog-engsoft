package com.engsoft.post_service.controllers;

import com.engsoft.post_service.annotations.Authenticated;
import com.engsoft.post_service.dtos.auth.AccountDTO;
import com.engsoft.post_service.services.PostService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.engsoft.post_service.dtos.posts.CreatePostDTO;
import com.engsoft.post_service.dtos.posts.PostDTO;
import com.engsoft.post_service.dtos.posts.UpdatePostDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/posts")
@SecurityRequirement(name = "bearerAuth")
public class PostController {

  @Autowired
  private PostService postService;

  @GetMapping
  @Authenticated(required = false)
  public Page<PostDTO> getPosts(
          @PageableDefault(size = 10, direction = Direction.DESC, sort = "createdAt") Pageable pageable) {
    return postService.getPosts(pageable);
  }

  @PostMapping
  @Authenticated
  @Transactional
  public void createPost(@RequestBody @Valid CreatePostDTO postData, HttpServletRequest request) {
      AccountDTO userAccount = (AccountDTO) request.getAttribute("userAccount");
      postService.createPost(postData);
  }

  @PutMapping("/{postId}")
  @Authenticated
  @Transactional
  public void updatePost(@PathVariable(required = true) String postId, @RequestBody @Valid UpdatePostDTO postData) {
    postService.updatePost(postId, postData);
  }

  @DeleteMapping("/{postId}")
  @Authenticated
  @Transactional
  public void deletePost(@PathVariable(required = true) String postId) {
    postService.deletePost(postId);
  }
}
