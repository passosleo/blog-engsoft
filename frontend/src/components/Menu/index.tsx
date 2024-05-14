import { useRequest } from "@/services/hooks/useRequest";
import { DefaultResponse } from "@/services/types";
import { useState } from "react";
import { CustomLoading } from "../CustomLoading";
import { Category } from "@/types/category";
import { useCategories } from "@/stores/categories";

export function Menu() {
  const { categories, setSelectedCategory } = useCategories();
  const isLoading = !categories.length;

  return (
    <div className="mr-5 flex flex-col gap-5">
      <CustomLoading isLoading={isLoading}>
        <div className="bg-black-secundary w-72 rounded-lg px-4 py-6 flex flex-col items-start gap-2">
          {(categories || []).map((category) => {
            return (
              <button
                key={category.categoryId}
                onClick={() => setSelectedCategory(category)}
                className="border-l-4 pl-4 rounded h-9"
                style={{ borderColor: category.color }}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </CustomLoading>
    </div>
  );
}
