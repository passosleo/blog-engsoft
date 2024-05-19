import ReactHtmlParser from "react-html-parser";
import "./global.css";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CustomAvatar } from "@/components/CustomAvatar";
import { Post as PostType } from "@/types/post";
import { autocapitalize } from "@/utils/functions/string";
import {
  Ellipsis,
  Globe,
  LockKeyhole,
  LogOutIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { formatDate } from "@/utils/functions/date";
import { useCategories } from "@/stores/categories";
import { CustomTooltip } from "@/components/CustomTooltip";
import { CustomDropdown } from "@/components/CustomDropdown";

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
        <div className="flex gap-2 items-center justify-center">
          <CustomTooltip text={isPublic ? "Público" : "Privado"}>
            {isPublic ? <Globe size={18} /> : <LockKeyhole size={18} />}
          </CustomTooltip>
          <div>
            <CustomTooltip text={formatDate(createdAt)}>
              <span className="text-[#8d8d99] text-sm">
                {publishedDateRelativeToNow}
              </span>
            </CustomTooltip>
            {isEdited && (
              <CustomTooltip text={formatDate(updatedAt)}>
                <span className="text-[#8d8d99] text-sm ml-1">
                  {"(editado)"}
                </span>
              </CustomTooltip>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-start justify-between">
          <h1>{title}</h1>
          <div className="flex justify-center items-center gap-2 mt-2 select-none">
            <CustomDropdown
              className="right-0"
              items={[
                {
                  element: (
                    <div className="flex gap-2 items-center">
                      <Pencil size={16} color="#8257E5" />
                      <span className="text-sm">Editar</span>
                    </div>
                  ),
                  onClick: () => console.log("editar"),
                },
                {
                  element: (
                    <div className="flex gap-2 items-center">
                      <Trash2 size={16} color="#8257E5" />
                      <span className="text-sm">Excluir</span>
                    </div>
                  ),
                  onClick: () => console.log("excluir"),
                },
              ]}
            >
              <Ellipsis className="cursor-pointer" />
            </CustomDropdown>
          </div>
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
