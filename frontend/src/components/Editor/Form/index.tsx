import { CustomForm } from "@/components/CustomForm";
import { Fields } from "../Fields";
import { PayloadCreatePost } from "..";
import { Category } from "@/types/category";
type Props = {
  schema: any;
  categories: Category[];
  isLoading: boolean;
  onSubmit: (values: PayloadCreatePost) => void;
  onCancel: () => void;
};

export function FormEditor({
  onSubmit,
  schema,
  categories,
  isLoading,
  onCancel,
}: Props) {
  return (
    <CustomForm
      onSubmit={onSubmit}
      zodSchema={schema}
      preventEnterSubmit
      resetOnSubmit
      className="p-4 border-t border-[#29292E]"
    >
      <Fields categories={categories} isLoading={isLoading} onCancel={onCancel} />
    </CustomForm>
  );
}