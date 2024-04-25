import { User } from "@/types/user";
import { create } from "zustand";
  
type StateProps = {
  user: User;
  setUser: (user: Partial<User>) => void;
};

export const useUserAccess = create<StateProps>((set) => ({
  user: {} as User,
  setUser: (user: Partial<User>) =>
    set((state) => ({ user: { ...state.user, ...user } })),
}));