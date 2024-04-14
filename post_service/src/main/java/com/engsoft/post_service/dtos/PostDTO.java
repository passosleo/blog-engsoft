package com.engsoft.post_service.dtos;

import com.engsoft.post_service.enums.PostCategory;

public record PostDTO(String title, String content, String author, PostCategory category) {
}
