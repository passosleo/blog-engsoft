import { useRequest } from "@/services/hooks/useRequest";
import { CustomPagination } from "../CustomPagination";
import { Post } from "./Post";
import { Post as PostType } from "@/types/post";
import { Pagination, RequestWithPagination } from "@/types/generic";
import { useState } from "react";

export function Posts() {
  const [page, setPage] = useState(0);

  const [getPosts, isLoading, paginatedPosts] = useRequest<
    RequestWithPagination,
    Pagination<PostType>
  >({
    host: "postService",
    routeName: "getPosts",
    payload: {
      query: {
        page: page,
        size: 5,
      },
    },
  });

  return (
    <div>
      {(paginatedPosts?.content || []).map((post, index) => (
        <Post key={index} {...post} />
      ))}

      {paginatedPosts && (
        <CustomPagination
          currentPage={paginatedPosts.number}
          totalItems={paginatedPosts.totalElements}
          pageSize={paginatedPosts.size}
          totalPages={paginatedPosts.totalPages}
          onPageChange={(page) => setPage(page)}
        />
      )}
    </div>
  );
}
