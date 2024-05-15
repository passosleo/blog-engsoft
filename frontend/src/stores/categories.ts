import { Category } from "@/types/category";
import { create } from "zustand";

type StateProps = {
  categories: Category[];
  selectedCategory: Category | null;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (category: Category | null) => void;
};

export const useCategories = create<StateProps>((set) => ({
  categories: [],
  selectedCategory: null,
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
}));
