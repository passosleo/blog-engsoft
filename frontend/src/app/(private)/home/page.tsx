"use client";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Menu } from "@/components/Menu";
import { Editor } from "@/components/Editor";
import { Posts } from "@/components/Posts";
import { useUserAccess } from "@/stores/user-access";
import { useMobile } from "@/hooks/useMobile";
import { twMerge } from "tailwind-merge";
import { When } from "@/components/shared/When";

export default function Home() {
  const { user } = useUserAccess();
  const isMobile = useMobile();

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div className={twMerge("flex", isMobile ? "flex-col" : "flex-row")}>
      <When condition={!isMobile}>
        <Menu />
        <div className="border-l pl-5 border-[#29292E] h-auto w-full ">
          <Editor
            isEditorOpen={isEditorOpen}
            setIsEditorOpen={setIsEditorOpen}
          />
          <Posts isEditorOpen={isEditorOpen} />
        </div>
      </When>

      <When condition={isMobile}>
        <Editor isEditorOpen={isEditorOpen} setIsEditorOpen={setIsEditorOpen} />
        <Menu className="mt-4" />
        <Posts isEditorOpen={isEditorOpen} />
      </When>
    </div>
  );
}
