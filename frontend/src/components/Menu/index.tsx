import { useRequest } from "@/services/hooks/useRequest";
import { DefaultResponse } from "@/services/types";
import { useState } from "react";
import { CustomLoading } from "../CustomLoading";
import { Category } from "@/types/category";
import { useCategories } from "@/stores/categories";
import { twMerge } from "tailwind-merge";

export function Menu({ className }: React.ComponentProps<"div">) {
  const { categories } = useCategories()
  const isLoading = !categories.length

  const [selectedCategory, setSelectedCategory] = useState("");

  function handleSelectedCategory(category: string) {
    setSelectedCategory(category);
  }

  return (
    <div className={twMerge("mr-5 flex flex-col gap-5", className)}>
      <CustomLoading isLoading={isLoading}>
        <div className="bg-black-secundary w-72 rounded-lg px-4 py-6 flex flex-col items-start gap-2">
          {(categories || []).map(({ categoryId, color, name }) => {
            return (
              <button
                key={categoryId}
                onClick={() => handleSelectedCategory(categoryId)}
                className="border-l-4 pl-4 rounded h-9"
                style={{ borderColor: color }}
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
