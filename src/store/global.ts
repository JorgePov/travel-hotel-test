import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AlertProps } from "../components/Alert/AlertComponent";
import { getHotels } from "../services/hotelService";
import { Hotel } from "../interfaces/Hotel";
import { User } from "../interfaces/User";
import { getBookingById } from "../services/bookingService";
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
  fetchMunicipalities: () => Promise<void>;
  municipalities: any[];
  fetchBooking: () => Promise<void>;
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
        municipalities: [],
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
        fetchMunicipalities: async () => {
          fetch('https://www.datos.gov.co/resource/xdk5-pm3f.json').then(res =>
            res.json().then(data => {
              const datasort = data.map((val: any) => ({ value: val.municipio, label: val.municipio }))
                .sort((a: any, b: any) => (a.municipio > b.municipio) ? 1 : -1)
              set({
                municipalities: datasort
              })
            }))
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
