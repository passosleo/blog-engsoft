"use client";
import React from "react";
import "react-quill/dist/quill.snow.css";
import { Menu } from "@/components/Menu";
import { Editor } from "@/components/Editor";

export default function Home() {

  return (
    <div className="flex">
      <Menu />
      <div className="border-l pl-5 border-[#29292E] h-auto w-full ">
        <Editor />
      </div>
    </div>
  );
}
