import { Category } from "./category";

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
