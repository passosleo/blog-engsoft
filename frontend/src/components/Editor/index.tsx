"use client";
import { useState } from "react";

import "./global.css";
import { createPostSchema } from "@/schemas/post";
import { useRequest } from "@/services/hooks/useRequest";
import { useCategories } from "@/stores/categories";
import { useToast } from "@/components/ui/use-toast";
import { twMerge } from "tailwind-merge";
import { useMobile } from "@/hooks/useMobile";
import { FormCreatePost } from "./FormCreatePost";
import { Category } from "@/types/category";
import { PencilLine, SquarePen } from "lucide-react";

export type PayloadCreatePost = {
  title: string;
  content: string;
  categoryId: string;
  isPublic: boolean;
};

type ResponseCreatePost = {
  postId: string;
  title: string;
  content: string;
  authorEmail: string;
  authorName: string;
  categoryId: string;
  category: Category
};

type EditorProps = {
  afterCreatePost: () => void;
};

export function Editor({ afterCreatePost }: EditorProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const isMobile = useMobile();

  const { categories, setSelectedCategory } = useCategories();
  const { toast } = useToast();

  const [createPost, isLoading] = useRequest<
    PayloadCreatePost,
    ResponseCreatePost
  >({
    host: "postService",
    routeName: "createPost",
    enabled: false,
    onSuccess: () => {
      toast({
        title: "Publicação criada com sucesso!",
        className: "bg-green-600 text-white",
      });
      onCancel();
      setSelectedCategory(null);
      afterCreatePost();
    },
    onError: () => {
      toast({
        title: "Ocorreu um erro ao criar a publicação",
        className: "bg-red-600 text-white",
      });
    },
  });

  function onCancel() {
    setIsEditorOpen(false);
  }

  function onSubmit(values: PayloadCreatePost) {
    createPost({
      payload: {
        body: {
          ...values,
          content: values.content.replace("&lt;", "<").replace("&gt;", ">"), // Fix for html tags
        },
      },
    });
  }

  return (
    <div className="bg-black-secundary flex flex-col rounded-lg ">
      <button
        className={twMerge("flex gap-2 items-center bg-black h-12 rounded px-3 focus:outline-none text-start text-[#9ca3af] hover:bg-black m-4", isMobile ? 'text-sm' : 'text-base')}
        onClick={() => setIsEditorOpen(isEditorOpen ? false : true)}
      >
        <PencilLine size={20} className="text-primary" />
        Criar nova postagem
      </button>
      <div className={`slide-down ${isEditorOpen ? "open" : ""}`}>
        <FormCreatePost onSubmit={onSubmit} schema={createPostSchema} categories={categories} isLoading={isLoading} onCancel={onCancel} />
      </div>
    </div>
  );
}
