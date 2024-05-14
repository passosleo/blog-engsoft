import { Category } from "@/types/category";
import { create } from "zustand";

type StateProps = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

export const useCategories = create<StateProps>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));

