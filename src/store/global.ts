import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AlertProps } from "../components/Alert/AlertComponent";
interface State {
  isAuth: boolean;
  isAdmin: boolean;
  userInfo?: any;
  setUserInfo: (userInfo: any, isAuth: boolean) => void;
  alert: AlertProps;
  setShowAlert: (showAlert: AlertProps) => void;
}

export const useGlobalStorage = create<State>()(
  persist(
    (set) => {
      return {
        userInfo: [],
        isAuth: false,
        isAdmin: false,
        alert: {
          isShow: false,
        },
        setUserInfo: (userInfo: any, isAuth: boolean) =>
          set({
            userInfo,
            isAuth,
            isAdmin: userInfo.type === "admin" ? true : false,
          }),
        setShowAlert: (alert: AlertProps) => set({ alert }),
      };
    },
    {
      name: "globalData",
    }
  )
);
