import { Category } from "./category";
import { Pageable } from "./generic";

export type Post = {
  postId: string;
  title: string;
  content: string;
  authorEmail: string;
  authorName: string;
  categoryId: string;
  category: Category;
  isPublic: boolean;
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type GetPosts = Pageable & {
  categoryId: string;
  authorEmail: string;
};
