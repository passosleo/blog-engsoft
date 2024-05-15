import { CustomPagination } from "../CustomPagination";
import { Post } from "./Post";
import { Post as PostType } from "@/types/post";
import { Pagination } from "@/types/generic";
import { CustomLoading } from "../CustomLoading";

type PostsProps = {
  posts: Pagination<PostType> | null;
  isLoading: boolean;
  onPaginate: (page: number) => void;
};

export function Posts({ posts, isLoading, onPaginate }: PostsProps) {
  return (
    <div>
      <CustomLoading isLoading={isLoading}>
        {(posts?.content || []).map((post, index) => (
          <Post key={index} {...post} />
        ))}

        {posts && (
          <CustomPagination
            currentPage={posts.number}
            totalPages={posts.totalPages}
            totalItems={posts.totalElements}
            onPageChange={(page) => onPaginate(page + 1)}
          />
        )}
      </CustomLoading>
    </div>
  );
}
