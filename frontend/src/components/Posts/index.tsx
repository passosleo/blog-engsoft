import { CustomPagination } from "../CustomPagination";
import { Post } from "./Post";
import { Post as PostType } from "@/types/post";
import { Pagination } from "@/types/generic";
import { CustomLoading } from "../CustomLoading";
import { When } from "../shared/When";

type PostsProps = {
  posts: Pagination<PostType> | null;
  isLoading: boolean;
  onPaginate: (page: number) => void;
};

export function Posts({ posts, isLoading, onPaginate }: PostsProps) {
  return (
    <div>
      <CustomLoading isLoading={isLoading}>
        <When condition={posts && posts?.content.length > 0}>
          {(posts?.content || []).map((post, index) => (
            <Post key={index} {...post} onClickCategory={() => onPaginate(1)} />
          ))}

          {posts && (
            <CustomPagination
              currentPage={posts.number + 1}
              totalPages={posts.totalPages}
              totalItems={posts.numberOfElements}
              onPageChange={onPaginate}
            />
          )}
        </When>
        <When condition={posts && posts?.content.length === 0}>
          <h4 className="text-center opacity-90">
            Ops! Parece que ainda não temos nenhuma postagem nesta categoria.
          </h4>
        </When>
      </CustomLoading>
    </div>
  );
}
