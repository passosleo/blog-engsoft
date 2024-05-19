import { User } from "@/types/user";
import { create } from "zustand";

type StateProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserAccess = create<StateProps>((set, get) => ({
  user: null,
  setUser: (user) =>
    set((state) => ({
      ...state,
      user,
    })),
}));
