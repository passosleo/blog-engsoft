package com.engsoft.post_service.controllers;

import com.engsoft.post_service.controllers.response.Response;
import com.engsoft.post_service.dtos.categories.CategoryDTO;
import com.engsoft.post_service.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/categories", produces = "application/json")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public Response<List<CategoryDTO>> getPosts() {
        var data = categoryService.getCategories();

        return Response.of(HttpStatus.OK, data);
    }
}
