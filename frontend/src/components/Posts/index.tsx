import { useRequest } from "@/services/hooks/useRequest";
import { CustomPagination } from "../CustomPagination";
import { Post } from "./Post";
import { GetPosts, Post as PostType } from "@/types/post";
import { Pageable, Pagination } from "@/types/generic";
import { useState } from "react";
import { CustomLoading } from "../CustomLoading";
import { useCategories } from "@/stores/categories";

type PostsProps = {
  isEditorOpen: boolean;
};

export function Posts({ isEditorOpen }: PostsProps) {
  const { selectedCategory } = useCategories();
  const [page, setPage] = useState(0);

  const pagination: Pageable = {
    page: page,
    size: 5,
  };

  const [getPosts, isLoading, paginatedPosts] = useRequest<
    GetPosts,
    Pagination<PostType>
  >({
    host: "postService",
    routeName: "getPosts",
    enabled: !isEditorOpen,
    payload: {
      query: selectedCategory
        ? { ...pagination, categoryId: selectedCategory.categoryId }
        : pagination,
    },
    onSuccess: (res) => {
      if (page >= res?.data?.totalPages) setPage(0);
    },
  });

  return (
    <div>
      <CustomLoading isLoading={isLoading}>
        {(paginatedPosts?.content || []).map((post, index) => (
          <Post key={index} {...post} />
        ))}

        {paginatedPosts && (
          <CustomPagination
            currentPage={paginatedPosts.number}
            totalPages={paginatedPosts.totalPages}
            totalItems={paginatedPosts.totalElements}
            onPageChange={(page) => setPage(page)}
          />
        )}
      </CustomLoading>
    </div>
  );
}
