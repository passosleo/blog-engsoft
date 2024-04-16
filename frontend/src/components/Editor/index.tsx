"use client";
import { useState } from "react";
import { CustomQuill } from "../CustomQuill";
import { When } from "../shared/When";
import { CustomButton } from "../CustomButton";

import "./global.css";
import { CustomSelect } from "../CustomSelect";
import { CustomForm } from "../CustomForm";
import { CustomInput } from "../CustomInput";
import { CustomSwitch } from "../CustomSwitch";
import { postSchema } from "@/schemas/post";

const categories = [
  {
    categoryId: "1",
    name: "Front-End",
    color: "#F3D0D7",
  },
  {
    categoryId: "2",
    name: "Back-End",
    color: "#B0C5A4",
  },
  {
    categoryId: "3",
    name: "DevOps",
    color: "#9BB0C1",
  },
  {
    categoryId: "4",
    name: "Mobile",
    color: "#8E7AB5",
  },
  {
    categoryId: "5",
    name: "UX/UI",
    color: "#F9B572",
  },
  {
    categoryId: "6",
    name: "Outros",
    color: "#8DDFCB",
  },
];

export function Editor() {
  const [isOpen, setIsOpen] = useState(false);

 

  function onCancel() {
    setIsOpen(false);
  }

  function onSubmit(values: any) {
    console.log("values: ", values);
  }

  return (
    <div className="bg-black-secundary p-4 flex flex-col rounded-lg ">
      <When condition={!isOpen}>
        <button
          className="bg-black h-12 rounded px-3 focus:outline-none justify-start text-[#9ca3af] hover:bg-black"
          onClick={() => setIsOpen(true)}
        >
          Crie uma nova postagem para compartilhar com a comunidade...
        </button>
      </When>
      <CustomForm onSubmit={onSubmit} zodSchema={postSchema}>
        <When condition={isOpen}>
          <CustomInput
            name="title"
            className="bg-black  rounded px-3 focus:outline-none"
            label="Título"
            placeholder="Título da publicação"
          />
        </When>

        <div className={`slide-down ${isOpen ? "open" : ""}`}>
          <CustomSelect
            options={categories.map((category) => ({
              label: category.name,
              value: category.categoryId,
              key: category.categoryId,
            }))}
            id="category"
            name="category"
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
              className="bg-black-secundary h-[41px] hover:bg-transparent"
              variant="outline"
              onClick={onCancel}
            >
              Cancelar
            </CustomButton>
            <CustomButton type="submit">Publicar</CustomButton>
          </div>
        </div>
      </CustomForm>
    </div>
  );
}
