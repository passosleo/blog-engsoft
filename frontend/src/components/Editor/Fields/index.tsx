import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { CustomQuill } from "@/components/CustomQuill";
import { CustomSelect } from "@/components/CustomSelect";
import { CustomSwitch } from "@/components/CustomSwitch";
import { Category } from "@/types/category";
import { useFormContext } from "react-hook-form";

type Props = {
  categories: Category[];
  isLoading: boolean;
  onCancel: () => void;
};

export function Fields({ categories, isLoading, onCancel }: Props) {
  const form = useFormContext();
  return (
    <>
      <CustomInput
        name="title"
        className="bg-black  rounded px-3 focus:outline-none"
        label="Título"
        placeholder="Título da publicação"
      />
      <CustomSelect
        options={categories.map((category) => ({
          label: category.name,
          value: category.categoryId,
          key: category.categoryId,
        }))}
        id="categoryId"
        name="categoryId"
        label="Categoria"
        className="w-full  "
      />
      <CustomSwitch
        id="isPublic"
        name="isPublic"
        label="Público"
        defaultChecked
      />
      <CustomQuill id="content" />
      <div className="flex gap-3 justify-end">
        <CustomButton
          type="button"
          className="bg-black-secundary h-[41px] hover:bg-transparent"
          variant="outline"
          onClick={() => {
            onCancel();
            form.reset();
          }}
        >
          Cancelar
        </CustomButton>
        <CustomButton type="submit" disabled={isLoading} isLoading={isLoading} className="min-w-[90px]">Publicar</CustomButton>
      </div>
    </>
  )
}