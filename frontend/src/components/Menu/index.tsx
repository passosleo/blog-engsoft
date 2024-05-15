import { CustomLoading } from "../CustomLoading";
import { useCategories } from "@/stores/categories";
import { twMerge } from "tailwind-merge";

export function Menu({ className }: React.ComponentProps<"div">) {
  const { categories, setSelectedCategory } = useCategories();
  const isLoading = !categories.length;

  return (
    <div className={twMerge("mr-5 flex flex-col gap-5", className)}>
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
