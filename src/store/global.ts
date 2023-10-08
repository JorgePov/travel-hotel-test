import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AlertProps } from "../components/Alert/AlertComponent";
import { useNavigate } from "react-router-dom";
interface State {
  isAuth: boolean;
  isAdmin: boolean;
  userInfo?: any;
  setUserInfo: (userInfo: any, isAuth: boolean) => void;
  alert: AlertProps;
  setShowAlert: (showAlert: AlertProps) => void;
  getIsAdmin: () => boolean;
  reset: () => void;
}

const initialState = {
  userInfo: [],
  isAuth: false,
  isAdmin: false,
};

export const useGlobalStorage = create<State>()(
  persist(
    (set, get) => {
      return {
        ...initialState,
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
        getIsAdmin: () => {
          const { isAdmin } = get();
          return isAdmin;
        },
        reset: () =>
          set({
            ...initialState,
          }),
      };
    },
    {
      name: "globalData",
    }
  )
);
