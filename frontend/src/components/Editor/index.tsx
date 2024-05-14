"use client";
import { useState } from "react";

import "./global.css";
import { CustomForm } from "../CustomForm";
import { createPostSchema } from "@/schemas/post";
import { useRequest } from "@/services/hooks/useRequest";
import { useCategories } from "@/stores/categories";
import { useToast } from "@/components/ui/use-toast"
import { Fields } from "./Fields";

type PayloadCreatePost = {
  title: string,
  content: string,
  categoryId: string,
  isPublic: boolean,
};

type ResponseCreatePost = {
  postId: string,
  title: string,
  content: string,
  authorEmail: string,
  authorName: string,
  categoryId: string,
  category: {
    categoryId: string,
    name: string,
    color: string,
    createdAt: string,
    updatedAt: string,
    enabled: boolean,
  }
};


export function Editor() {
  const { categories } = useCategories()
  const { toast } = useToast()

  const [isOpen, setIsOpen] = useState(false);

  const [createPost, isLoading] = useRequest<PayloadCreatePost, ResponseCreatePost>({
    host: "postService",
    routeName: "createPost",
    enabled: false,
    onSuccess: () => {
      toast({
        title: "Publicação criada com sucesso!",
        className: "bg-green-600 text-white",
      })
      onCancel();
    },
    onError: () => {
      toast({
        title: "Ocorreu um erro ao criar a publicação",
        className: "bg-red-600 text-white",
      })
    }
  });

  function onCancel() {
    setIsOpen(false);

  }

  function onSubmit(values: any) {
    createPost({
      payload: {
        body: values,
      },
    });
  }

  return (
    <div className="bg-black-secundary flex flex-col rounded-lg ">
      <button
        className="bg-black h-12 rounded px-3 focus:outline-none text-start text-[#9ca3af] hover:bg-black m-4"
        onClick={() => setIsOpen(true)}
      >
        Crie uma nova postagem para compartilhar com a comunidade...
      </button>
      <div className={`slide-down ${isOpen ? "open" : ""}`}>
        <CustomForm
          onSubmit={onSubmit}
          zodSchema={createPostSchema}
          className="p-4 border-t border-[#29292E]"
        >
          <Fields categories={categories} isLoading={isLoading} onCancel={onCancel} />
        </CustomForm>
      </div>
    </div>
  );
}
