import { create } from "zustand";
import { persist } from "zustand/middleware";
interface State {
  userInfo?: any;
  setUserInfo?: (userInfo: any) => void;
}

export const useGlobalStore = create<State>()(
  persist(
    (set, get) => {
      return {
        userInfo: [],
        setUserInfo: (userInfo: any) => set(() => ({ userInfo: userInfo })),
      };
    },
    {
      name: "globalData",
    }
  )
);
