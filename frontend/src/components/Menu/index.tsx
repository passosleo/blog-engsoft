import { useRequest } from "@/services/hooks/useRequest";
import { DefaultResponse } from "@/services/types";
import { useState } from "react";
import { CustomLoading } from "../CustomLoading";

type Category = {
  categoryId: string;
  name: string;
  color: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export function Menu() {
  const [getCategories, isLoading, categories] = useRequest<void, Category[]>({
    host: "postService",
    routeName: "getCategories",
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  function handleSelectedCategory(category: string) {
    setSelectedCategory(category);
  }

  return (
    <div className="mr-5 flex flex-col gap-5">
      <CustomLoading isLoading={isLoading}>
        <div className="bg-black-secundary w-72 rounded-lg px-4 py-6 flex flex-col items-start gap-2">
          {(categories || []).map(({ categoryId, color, name }) => {
            return (
              <button
                key={categoryId}
                onClick={() => handleSelectedCategory(categoryId)}
                className="border-l-4 pl-4 rounded h-9"
              >
                {name}
              </button>
            );
          })}
        </div>
      </CustomLoading>
    </div>
  );
}
