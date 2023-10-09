import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AlertProps } from "../components/Alert/AlertComponent";
import { getHotels } from "../services/hotelService";
import { Hotel } from "../interfaces/Hotel";
interface State {
  isAuth: boolean;
  isAdmin: boolean;
  userInfo?: any;
  setUserInfo: (userInfo: any, isAuth: boolean) => void;
  alert: AlertProps;
  setShowAlert: (showAlert: AlertProps) => void;
  getIsAdmin: () => boolean;
  reset: () => void;
  fetchHotels: () => Promise<void>
  hotels: Hotel[]
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
        hotels: [],
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
        fetchHotels: async () => {
          const res = await getHotels()
          if (res) {
            set({
              hotels: [...res]
            })
          }
        }
      };
    },
    {
      name: "globalData",
    }
  )
);
