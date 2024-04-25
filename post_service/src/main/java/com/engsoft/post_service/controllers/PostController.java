package com.engsoft.post_service.controllers;

import com.engsoft.post_service.annotations.Authenticated;
import com.engsoft.post_service.controllers.response.Response;
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
  public Response<Page<PostDTO>> getPosts(
          @PageableDefault(size = 10, direction = Direction.DESC, sort = "createdAt") Pageable pageable,
          @RequestParam(required = false) String categoryId,
          @RequestParam(required = false) String authorEmail,
          HttpServletRequest request) {
    var userAccount = Session.getUserAccount(request);
    var data = postService.getPosts(pageable, categoryId, authorEmail, userAccount);

    return Response.of(HttpStatus.OK, data);
  }

  @PostMapping
  @Authenticated
  @Transactional
  public Response<PostDTO> createPost(@RequestBody @Valid CreatePostDTO postData, HttpServletRequest request) {
    var userAccount = Session.getUserAccount(request);
    var data = postService.createPost(postData, userAccount);

    return Response.of(HttpStatus.CREATED, data);
  }

  @PutMapping("/{postId}")
  @Authenticated
  @Transactional
  public Response<PostDTO> updatePost(@PathVariable(required = true) String postId, @RequestBody @Valid UpdatePostDTO postData,
                                             HttpServletRequest request) {
    var userAccount = Session.getUserAccount(request);
    var data = postService.updatePost(postId, postData, userAccount);

    return Response.of(HttpStatus.OK, data);
  }

  @DeleteMapping("/{postId}")
  @Authenticated
  @Transactional
  public Response<Boolean> deletePost(@PathVariable(required = true) String postId, HttpServletRequest request) {
    var userAccount = Session.getUserAccount(request);
    var data = postService.deletePost(postId, userAccount);

    return Response.of(HttpStatus.OK, data);
  }
}
