package com.engsoft.post_service.controllers;

import com.engsoft.post_service.annotations.Authenticated;
import com.engsoft.post_service.controllers.response.DefaultResponse;
import com.engsoft.post_service.services.PostService;
import com.engsoft.post_service.utils.auth.Session;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.engsoft.post_service.dtos.posts.CreatePostDTO;
import com.engsoft.post_service.dtos.posts.PostDTO;
import com.engsoft.post_service.dtos.posts.UpdatePostDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/v1/posts", produces = "application/json")
@SecurityRequirement(name = "bearerAuth")
public class PostController {

  @Autowired
  private PostService postService;

  @GetMapping
  @Authenticated(required = false)
  public DefaultResponse<Page<PostDTO>> getPosts(
          @PageableDefault(size = 10, direction = Direction.DESC, sort = "createdAt") Pageable pageable, HttpServletRequest request) {
    var userAccount = Session.getUserAccount(request);
    var data = postService.getPosts(pageable, userAccount);

    return DefaultResponse.<Page<PostDTO>>builder()
            .status(HttpStatus.OK.value())
            .message(HttpStatus.OK.getReasonPhrase())
            .data(data)
            .build();
  }

  @PostMapping
  @Authenticated
  @Transactional
  public DefaultResponse<PostDTO> createPost(@RequestBody @Valid CreatePostDTO postData, HttpServletRequest request) {
    var userAccount = Session.getUserAccount(request);
    var data = postService.createPost(postData, userAccount);

    return DefaultResponse.<PostDTO>builder()
            .status(HttpStatus.CREATED.value())
            .message(HttpStatus.CREATED.getReasonPhrase())
            .data(data)
            .build();
  }

  @PutMapping("/{postId}")
  @Authenticated
  @Transactional
  public DefaultResponse<PostDTO> updatePost(@PathVariable(required = true) String postId, @RequestBody @Valid UpdatePostDTO postData,
                                             HttpServletRequest request) {
    var userAccount = Session.getUserAccount(request);
    var data = postService.updatePost(postId, postData, userAccount);

    return DefaultResponse.<PostDTO>builder()
            .status(HttpStatus.OK.value())
            .message(HttpStatus.OK.getReasonPhrase())
            .data(data)
            .build();
  }

  @DeleteMapping("/{postId}")
  @Authenticated
  @Transactional
  public DefaultResponse<Boolean> deletePost(@PathVariable(required = true) String postId, HttpServletRequest request) {
    var userAccount = Session.getUserAccount(request);
    var data = postService.deletePost(postId, userAccount);

    return DefaultResponse.<Boolean>builder()
            .status(HttpStatus.OK.value())
            .message(HttpStatus.OK.getReasonPhrase())
            .data(data)
            .build();
  }
}
