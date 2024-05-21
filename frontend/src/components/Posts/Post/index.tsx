import ReactHtmlParser from "react-html-parser";
import "./global.css";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CustomAvatar } from "@/components/CustomAvatar";
import { Post as PostType } from "@/types/post";
import { autocapitalize } from "@/utils/functions/string";
import { Ellipsis, Globe, LockKeyhole, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/utils/functions/date";
import { useCategories } from "@/stores/categories";
import { CustomTooltip } from "@/components/CustomTooltip";
import { CustomDropdown } from "@/components/CustomDropdown";
import { confirm } from "@/providers/ConfirmModal";
import { useUserAccess } from "@/stores/user-access";
import { When } from "@/components/shared/When";
import { CustomModal } from "@/components/CustomModal";
import { useCustomModal } from "@/components/CustomModal/hooks/useCustomModal";
import { Editor } from "@/components/Editor";
import { FormEditor } from "@/components/Editor/Form";
import { createPostSchema } from "@/schemas/post";

export function Post({
  postId,
  title,
  content,
  category,
  authorEmail,
  authorName,
  isPublic,
  isEdited,
  updatedAt,
  createdAt,
  onDelete,
  onClickCategory,
}: PostType & {
  onClickCategory: () => void;
  onDelete: (postId: string) => void;
}) {
  const { user } = useUserAccess();
  const { isOpen, toggleModal } = useCustomModal();
  const { categories, selectedCategory, setSelectedCategory } = useCategories();
  const publishedDateRelativeToNow = formatDistanceToNow(
    createdAt || new Date(),
    {
      locale: ptBR,
      addSuffix: true,
    }
  );

  return (
    <>
      <div className="bg-black-secundary py-4 px-8 my-4 rounded-lg">
        <div className="flex justify-between border-b border-[#29292E] pb-4">
          <div className="flex justify-center gap-2 items-center">
            <CustomAvatar name={authorName} />
            <span className="font-medium">{autocapitalize(authorName)}</span>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <CustomTooltip text={isPublic ? "Público" : "Privado"}>
              {isPublic ? (
                <Globe size={18} color="#8d8d99" />
              ) : (
                <LockKeyhole size={18} color="#8d8d99" />
              )}
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
            <When condition={user?.email === authorEmail}>
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
                      onClick: () => toggleModal(),
                    },
                    {
                      element: (
                        <div className="flex gap-2 items-center">
                          <Trash2 size={16} color="#8257E5" />
                          <span className="text-sm">Excluir</span>
                        </div>
                      ),
                      onClick: () =>
                        confirm({
                          title:
                            "Tem certeza que deseja excluir esta publicação?",
                          onConfirm: () => onDelete(postId),
                        }),
                    },
                  ]}
                >
                  <Ellipsis className="hover:text-primary transition-colors" />
                </CustomDropdown>
              </div>
            </When>
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
      <CustomModal open={isOpen} onOpenChange={toggleModal}>
        <p className="m-0 mb-2 font-medium">Editar publicação</p>

        <FormEditor onSubmit={() => { }} schema={createPostSchema} categories={categories} isLoading={true} onCancel={() => { }} />
      </CustomModal>
    </>
  );
}
