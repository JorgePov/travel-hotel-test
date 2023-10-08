import { create } from "zustand";
import { persist } from "zustand/middleware";
interface State {
  isAuth: boolean;
  userInfo?: any;
  setUserInfo: (userInfo: any, isAuth: boolean) => void;
}

export const useGlobalStorage = create<State>()(
  persist(
    (set) => {
      return {
        userInfo: [],
        isAuth: false,
        setUserInfo: (userInfo: any, isAuth: boolean) =>
          set({ userInfo, isAuth }),
      };
    },
    {
      name: "globalData",
    }
  )
);
