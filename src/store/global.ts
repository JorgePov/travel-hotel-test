import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AlertProps } from "../components/Alert/AlertComponent";
import { getHotels } from "../services/hotelService";
import { Hotel } from "../interfaces/Hotel";
import { User } from "../interfaces/User";
import { getBookingById, getBookings } from "../services/bookingService";
interface State {
  isAuth: boolean;
  isAdmin: boolean;
  userInfo?: User;
  setUserInfo: (userInfo: User, isAuth: boolean) => void;
  alert: AlertProps;
  setShowAlert: (showAlert: AlertProps) => void;
  getIsAdmin: () => boolean;
  reset: () => void;
  fetchHotels: () => Promise<void>;
  hotels: Hotel[];
  fetchBooking: () => Promise<void>;
  fetchBookingAdmin: () => Promise<void>;
  fetchBookingById: (id: string) => Promise<void>;
  booking: any[];
  bookingSelect?: any;
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
        hotels: [],
        booking: [],
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
        fetchHotels: async () => {
          const res = await getHotels();
          if (res) {
            set({
              hotels: [...res],
            });
          }
        },
        fetchBookingById: async (id: string) => {
          const { booking } = get();
          if (booking) {
            const bookingFilter = booking.find(({ data }) => {
              return data.id === id;
            });

            set({
              bookingSelect: bookingFilter,
            });
          }
        },
        fetchBookingAdmin: async () => {
          const res = await getBookings();
          if (res) {
            set({
              booking: [...res],
            });
          }
        },
        fetchBooking: async () => {
          const { userInfo } = get();
          const id = userInfo?.id || "";
          const res = await getBookingById(id);
          if (res) {
            set({
              booking: [...res],
            });
          }
        },
      };
    },
    {
      name: "globalData",
    }
  )
);
