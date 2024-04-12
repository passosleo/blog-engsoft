// components/MarkdownEditor.js
"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic"; // Importa a função dynamic de next/dynamic
import "react-quill/dist/quill.snow.css";
import { Menu } from "@/components/Menu";
// Verifica se o código está sendo executado no navegador antes de importar o ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function Home() {
  const [text, setText] = useState("");

  const handleChange = (value: any) => {
    console.log("value: ", value);
    setText(value);
  };

  return (
    <div className="flex">
      <Menu />
      <div className=" border-l pl-5 border-[#29292E] h-auto">
        <div>
          <ReactQuill value={text} onChange={handleChange} />
          <button>Save as Markdown</button>
        </div>
      </div>
    </div>
  );
}
