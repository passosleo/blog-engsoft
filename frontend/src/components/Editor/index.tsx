"use client";
import { useState } from "react";
import { CustomQuill } from "../CustomQuill";
import { CustomButton } from "../CustomButton";

import "./global.css";
import { CustomSelect } from "../CustomSelect";
import { CustomForm } from "../CustomForm";
import { CustomInput } from "../CustomInput";
import { CustomSwitch } from "../CustomSwitch";
import { createPostSchema } from "@/schemas/post";
import { useRequest } from "@/services/hooks/useRequest";
import { useCategories } from "@/stores/categories";

type PayloadCreatePost = {
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
  category: {
    categoryId: string;
    name: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    enabled: boolean;
  };
};

export function Editor() {
  const { categories } = useCategories();
  console.log("categories: ", categories);

  const [isOpen, setIsOpen] = useState(false);

  const [createPost, isLoading] = useRequest<
    PayloadCreatePost,
    ResponseCreatePost
  >({
    host: "postService",
    routeName: "createPost",
    enabled: false,
    onSuccess: (res) => {
      console.log("Post criado com sucesso: ", res.data);
    },
    onError: (error) => {
      console.log("Erro ao criar post: ", error);
    },
  });

  function onCancel() {
    setIsOpen(false);
  }

  function onSubmit(values: any) {
    console.log("values: ", values);
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
          preventEnterSubmit
          className="p-4 border-t border-[#29292E]"
        >
          <CustomInput
            name="title"
            className="bg-black  rounded px-3 focus:outline-none"
            label="Título"
            placeholder="Título da publicação"
          />
          <CustomSelect
            options={categories.map((category) => ({
              label: category.name,
              value: category.categoryId,
              key: category.categoryId,
            }))}
            id="categoryId"
            name="categoryId"
            label="Categoria"
            className="w-full  "
          />
          <CustomSwitch
            id="isPublic"
            name="isPublic"
            label="Público"
            defaultChecked
          />
          <CustomQuill id="content" />
          <div className="flex gap-3 justify-end">
            <CustomButton
              type="button"
              className="bg-black-secundary h-[41px] hover:bg-transparent"
              variant="outline"
              onClick={onCancel}
            >
              Cancelar
            </CustomButton>
            <CustomButton
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
            >
              Publicar
            </CustomButton>
          </div>
        </CustomForm>
      </div>
    </div>
  );
}
