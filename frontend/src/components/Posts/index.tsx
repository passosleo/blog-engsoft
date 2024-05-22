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
  reloadPosts: () => void;
};

export type PayloadUpdatePost = {
  title: string;
  content: string;
  categoryId: string;
  isPublic: boolean;
};

export function Posts({
  posts,
  isLoading,
  onPaginate,
  reloadPosts,
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
  });

  const [updatePost, isUpdating] = useRequest<PayloadUpdatePost, void>({
    host: "postService",
    routeName: "updatePost",
    enabled: false,
    onSuccess: () =>
      toast({
        title: "Publicação editada com sucesso!",
        className: "bg-green-600 text-white",
      }),
  });

  return (
    <div>
      <CustomLoading isLoading={isLoading || isDeleting}>
        <When condition={posts && posts?.content.length > 0}>
          {(posts?.content || []).map((post, index) => (
            <Post
              isLoading={isUpdating}
              key={index}
              {...post}
              onClickCategory={() => onPaginate(1)}
              onUpdate={(postId, data, callback) => {
                updatePost({
                  payload: { body: data, params: { postId } },
                  onSuccess: () => {
                    callback();
                    reloadPosts();
                  },
                });
              }}
              onDelete={(postId) => {
                deletePost({
                  payload: { params: { postId } },
                  onSuccess: reloadPosts,
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
            Nenhuma postagem encontrada
          </h4>
        </When>
      </CustomLoading>
    </div>
  );
}
