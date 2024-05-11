package com.engsoft.post_service.repositories;

import com.engsoft.post_service.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, String> {
    CategoryEntity findByCategoryId(String categoryId);
}
