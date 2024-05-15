import { CustomLoading } from "../CustomLoading";
import { useCategories } from "@/stores/categories";
import { twMerge } from "tailwind-merge";

type MenuProps = React.ComponentProps<"div"> & {
  onClickCategory: () => void;
};

export function Menu({ className, onClickCategory }: MenuProps) {
  const { categories, selectedCategory, setSelectedCategory } = useCategories();
  const isLoading = !categories.length;

  return (
    <div className={twMerge("mr-5 flex flex-col gap-5", className)}>
      <CustomLoading isLoading={isLoading}>
        <div className="bg-black-secundary w-72 rounded-lg px-4 py-6 flex flex-col items-start gap-2">
          {(categories || []).map((category) => {
            return (
              <button
                key={category.categoryId}
                onClick={() => {
                  if (category.categoryId === selectedCategory?.categoryId) {
                    setSelectedCategory(null);
                  } else {
                    setSelectedCategory(category);
                  }
                  onClickCategory();
                }}
                className={twMerge(
                  "border-l-4 pl-4 rounded h-9 w-full text-start transition-colors duration-200 ease-in-out",
                  selectedCategory?.categoryId === category.categoryId
                    ? "bg-black/75"
                    : ""
                )}
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
