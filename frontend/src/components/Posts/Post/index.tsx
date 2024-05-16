import ReactHtmlParser from "react-html-parser";
import "./global.css";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CustomAvatar } from "@/components/CustomAvatar";
import { Post as PostType } from "@/types/post";
import { autocapitalize } from "@/utils/functions/string";
import { Globe, LockKeyhole } from "lucide-react";
import { formatDate } from "@/utils/functions/date";
import { useCategories } from "@/stores/categories";
import { useRouter } from "next/navigation";

export function Post({
  title,
  content,
  category,
  authorName,
  isPublic,
  isEdited,
  updatedAt,
  createdAt,
  onClickCategory,
}: PostType & {
  onClickCategory: () => void;
}) {
  const router = useRouter();
  const { selectedCategory, setSelectedCategory } = useCategories();
  const publishedDateRelativeToNow = formatDistanceToNow(
    createdAt || new Date(),
    {
      locale: ptBR,
      addSuffix: true,
    }
  );

  return (
    <div className="bg-black-secundary py-4 px-8 my-4 rounded-lg">
      <div className="flex justify-between border-b border-[#29292E] pb-4">
        <div className="flex justify-center gap-2 items-center">
          <CustomAvatar name={authorName} />
          <span className="font-medium">{autocapitalize(authorName)}</span>
        </div>
        <div className="flex gap-1 items-center justify-center">
          <time
            title={formatDate(createdAt)}
            dateTime={createdAt.toString()}
            className="text-[#8d8d99] text-sm"
          >
            {publishedDateRelativeToNow}
          </time>
          {isEdited && (
            <time
              title={formatDate(updatedAt)}
              dateTime={createdAt.toString()}
              className="text-[#8d8d99] text-sm"
            >
              {"(editado)"}
            </time>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h1>{title}</h1>
          {isPublic ? (
            <Globe className="mt-[-40px]" size={18} />
          ) : (
            <LockKeyhole className="mt-[-40px]" size={18} />
          )}
        </div>
        <div>{ReactHtmlParser(content)}</div>
      </div>

      <div className="flex mt-4 gap-2 border-t border-[#29292E] pt-4">
        <span className="text-[#8d8d99]">Categoria:</span>
        <div
          className={`w-fit px-2 rounded text-white cursor-pointer select-none`}
          style={{ backgroundColor: category.color }}
          onClick={() => {
            if (selectedCategory?.categoryId === category.categoryId) return;
            setSelectedCategory(category);
            onClickCategory();
          }}
        >
          <span className="font-medium text-sm">{category.name}</span>
        </div>
      </div>
    </div>
  );
}
