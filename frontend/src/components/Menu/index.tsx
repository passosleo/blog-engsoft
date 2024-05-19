import { useCategories } from "@/stores/categories";
import { CustomLoading } from "../CustomLoading";
import { twMerge } from "tailwind-merge";
import { useMobile } from "@/hooks/useMobile";

type MenuProps = React.ComponentProps<"div"> & {
  onClickCategory: () => void;
};

export function Menu({ className, onClickCategory }: MenuProps) {
  const { categories, selectedCategory, setSelectedCategory } = useCategories();
  const isLoading = !categories.length;
  const isMobile = useMobile();

  return (
    <div
      className={twMerge(
        "flex flex-col gap-5",
        !isMobile ? "mr-5" : "",
        className
      )}
    >
      <CustomLoading isLoading={isLoading}>
        <div
          className={twMerge(
            `bg-black-secundary rounded-lg p-4 flex flex-col items-start gap-2 flex-wrap min-w-72`
          )}
        >
          {(categories || []).map((category) => {
            const isSelected =
              selectedCategory?.categoryId === category.categoryId;
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
                  "pl-2 rounded h-9 text-start transition-colors duration-200 ease-in-out w-full",
                  isSelected ? "bg-black" : ""
                )}
              >
                <span
                  className="rounded-md mr-2"
                  style={{ background: category.color, padding: "0 2px" }}
                />
                {category.name}
              </button>
            );
          })}
        </div>
      </CustomLoading>
    </div>
  );
}
