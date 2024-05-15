"use client";
import React from "react";
import "react-quill/dist/quill.snow.css";
import { Menu } from "@/components/Menu";
import { Editor } from "@/components/Editor";
import { Posts } from "@/components/Posts";
import { useUserAccess } from "@/stores/user-access";
import { useMobile } from "@/hooks/useMobile";
import { twMerge } from "tailwind-merge";
import { When } from "@/components/shared/When";
import { Pagination } from "@/types/generic";
import { useRequest } from "@/services/hooks/useRequest";
import { GetPosts, Post } from "@/types/post";
import { useCategories } from "@/stores/categories";
import { usePagination } from "@/components/CustomPagination/hooks/usePagination";

export default function Home() {
  const { pagination, onPaginate } = usePagination();
  const { selectedCategory } = useCategories();
  const { user } = useUserAccess();
  const isMobile = useMobile();

  const normalizedPagination = {
    page: pagination.page - 1,
    size: pagination.size,
  };

  const [updatePosts, isLoading, posts] = useRequest<
    GetPosts,
    Pagination<Post>
  >({
    host: "postService",
    routeName: "getPosts",
    payload: {
      query: selectedCategory
        ? {
            ...normalizedPagination,
            categoryId: selectedCategory.categoryId,
          }
        : normalizedPagination,
    },
  });

  function afterCreatePost() {
    updatePosts();
    onPaginate(1);
  }

  return (
    <div className={twMerge("flex", isMobile ? "flex-col" : "flex-row")}>
      <When condition={!isMobile}>
        <Menu onClickCategory={() => onPaginate(1)} />
        <div className="border-l pl-5 border-[#29292E] h-auto w-full ">
          <Editor afterCreatePost={afterCreatePost} />
          <Posts posts={posts} onPaginate={onPaginate} isLoading={isLoading} />
        </div>
      </When>

      <When condition={isMobile}>
        <Editor afterCreatePost={afterCreatePost} />
        <Menu className="mt-4" onClickCategory={() => onPaginate(1)} />
        <Posts posts={posts} onPaginate={onPaginate} isLoading={isLoading} />
      </When>
    </div>
  );
}
