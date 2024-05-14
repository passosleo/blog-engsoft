import { useRequest } from "@/services/hooks/useRequest";
import { CustomPagination } from "../CustomPagination";
import { Post } from "./Post";
import { Post as PostType } from "@/types/post";
import { Pagination } from "@/types/generic";

export function Posts() {
  const [getPosts, isLoading, paginatedPosts] = useRequest<
    void,
    Pagination<PostType>
  >({
    host: "postService",
    routeName: "getPosts",
  });

  return (
    <div>
      {(paginatedPosts?.content || []).map((post, index) => (
        <Post key={index} {...post} />
      ))}
      <CustomPagination />
    </div>
  );
}
