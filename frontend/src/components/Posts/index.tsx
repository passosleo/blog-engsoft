import { CustomPagination } from "../CustomPagination";
import { Post } from "./Post";
import { Post as PostType } from "@/types/post";
import { Pagination } from "@/types/generic";
import { CustomLoading } from "../CustomLoading";
import { When } from "../shared/When";
import { useRequest } from "@/services/hooks/useRequest";
import { toast } from "../ui/use-toast";

type PostsProps = {
  posts: Pagination<PostType> | null;
  isLoading: boolean;
  onPaginate: (page: number) => void;
  afterDeletePost: () => void;
};

export function Posts({
  posts,
  isLoading,
  onPaginate,
  afterDeletePost,
}: PostsProps) {
  const [deletePost, isDeleting] = useRequest({
    host: "postService",
    routeName: "deletePost",
    enabled: false,
    onSuccess: () =>
      toast({
        title: "Publicação excluída com sucesso!",
        className: "bg-green-600 text-white",
      }),
    onError: () => {
      toast({
        title: "Ops! Algo deu errado ao tentar excluir a publicação.",
        className: "bg-red-600 text-white",
      });
    },
  });

  return (
    <div>
      <CustomLoading isLoading={isLoading || isDeleting}>
        <When condition={posts && posts?.content.length > 0}>
          {(posts?.content || []).map((post, index) => (
            <Post
              key={index}
              {...post}
              onClickCategory={() => onPaginate(1)}
              onDelete={(postId) => {
                deletePost({
                  payload: { params: { postId } },
                  onSuccess: afterDeletePost,
                });
              }}
            />
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
