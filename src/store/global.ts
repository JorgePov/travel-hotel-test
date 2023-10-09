import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AlertProps } from "../components/Alert/AlertComponent";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
interface State {
  isAuth: boolean;
  isAdmin: boolean;
  userInfo?: User;
  setUserInfo: (userInfo: User, isAuth: boolean) => void;
  alert: AlertProps;
  setShowAlert: (showAlert: AlertProps) => void;
  getIsAdmin: () => boolean;
  reset: () => void;
}

const userInit: User = {
  id: "",
  document: "",
  documentType: "",
  email: "",
  genre: "",
  lastName: "",
  name: "",
  phoneNumber: "",
  type: "travel",
};

const initialState = {
  isAuth: false,
  isAdmin: false,
  userInfo: userInit,
};

export const useGlobalStorage = create<State>()(
  persist(
    (set, get) => {
      return {
        ...initialState,
        alert: {
          isShow: false,
        },
        setUserInfo: (userInfo: User, isAuth: boolean) =>
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
