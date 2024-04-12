"use client";
import { useState } from "react";
import { CustomQuill } from "../CustomQuill";
import { When } from "../shared/When";
import { CustomButton } from "../CustomButton";

import "./styles.css";

export function Editor() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-black-secundary p-4 flex flex-col rounded-lg ">
      <When condition={!isOpen}>
        <button
          className="bg-black h-12 rounded px-3 focus:outline-none text-start text-[#9ca3af] "
          onClick={() => setIsOpen(true)}
        >
          Crie uma nova postagem para compartilhar com a comunidade...
        </button>
      </When>

      <When condition={isOpen}>
        <input
          type="text"
          className="bg-black h-12 rounded px-3   focus:outline-none"
          placeholder="Título da publicação"
        />
      </When>

      <div className={`slide-down ${isOpen ? "open" : ""}`}>
        <CustomQuill />
        <div className="flex gap-3 justify-end">
          <CustomButton
            className="bg-black-secundary h-[41px]"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </CustomButton>
          <CustomButton>Publicar</CustomButton>
        </div>
      </div>
    </div>
  );
}
