import { CustomForm } from "@/components/CustomForm";
import { Fields } from "../Fields";
import { Category } from "@/types/category";
import { PayloadUpdatePost } from "@/components/Posts";

type Props = {
  schema: any;
  categories: Category[];
  isLoading: boolean;
  formValues: PayloadUpdatePost;
  onSubmit: (values: PayloadUpdatePost) => void;
  onCancel: () => void;
};

export function FormUpdatePost({
  onSubmit,
  schema,
  categories,
  isLoading,
  onCancel,
  formValues,
}: Props) {
  return (
    <CustomForm
      onSubmit={onSubmit}
      zodSchema={schema}
      preventEnterSubmit
      resetOnSubmit
      className="p-4 border-t border-[#29292E]"
      useFormProps={{ defaultValues: formValues }}
    >
      <Fields categories={categories} isLoading={isLoading} onCancel={onCancel} />
    </CustomForm>
  );
}