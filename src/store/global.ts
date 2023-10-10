import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AlertProps } from "../components/Alert/AlertComponent";
import { getHotelByFilter, getHotels } from "../services/hotelService";
import { Hotel, Room } from "../interfaces/Hotel";
import { User } from "../interfaces/User";
import {
  getBookingById,
  getBookingByIdUser,
  getBookings,
} from "../services/bookingService";
import { getRoomsByFilter, getRoomsByHotel } from "../services/roomService";
import { Timestamp } from "@firebase/firestore";
import { Booking } from "../interfaces/Booking";
import { calculateDaysBetweenTimestamps } from "../utils/utils";
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
  searchedHotels: Hotel[];
  rooms: Room[];
  totalDays: number;
  fetchRooms: (idHotel: string) => Promise<void>;
  fetchRoomsClient: (idHotel: string) => Promise<void>;
  fetchMunicipalities: () => Promise<void>;
  municipalities: any[];
  fetchBooking: () => Promise<void>;
  fetchBookingAdmin: () => Promise<void>;
  fetchBookingById: (id: string) => Promise<void>;
  fetchSearchHotels: (
    startDate: Timestamp,
    finishDate: Timestamp,
    city: string,
    travels: number
  ) => Promise<void>;
  booking: any[];
  bookingSelect?: any;
  isLoading: boolean;
  setLoading: (state: boolean) => void;
  hotelSelected?: Hotel;
  setHotelSelected: (hotel: Hotel) => void;
  roomSelected?: Room;
  setRoomSelected: (room: Room) => void;
  fetchBoockingById: (idBooking: string) => Promise<void>;
  listIdRooms: string[];
  focusCity: string;
  numberTravels?: number;
  travelDate?: {
    startDate: Timestamp;
    finishDate: Timestamp;
  };
  setCreateDataBooking: (createDataBooking: Booking) => void;
  createDataBooking: Booking;
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

const hotelInit: Hotel = {
  id: "",
  address: "",
  checkInTime: "",
  checkOutTime: "",
  city: "",
  comision: 0,
  idImage: 0,
  name: " ",
  phoneNumber: "",
  state: "active",
};

const roomInit: Room = {
  description: "",
  idHotel: "",
  id: "",
  numberRoom: "",
  price: 0,
  roomType: "double",
  state: "active",
  tax: 0,
  ubication: "",
};

const initialState = {
  isAuth: false,
  isAdmin: false,
  listIdRooms: [""],
  focusCity: "",
  numberTravels: 1,
  userInfo: userInit,
  hotelSelected: hotelInit,
  totalDays: 1,
  roomSelected: roomInit,
  isLoading: false,
  createDataBooking: {},
  municipalities: [],
  hotels: [],
  searchedHotels: [],
  rooms: [],
  booking: [],
  alert: {
    isShow: false,
  },
};

export const useGlobalStorage = create<State>()(
  persist(
    (set, get) => {
      return {
        ...initialState,

        setCreateDataBooking: (createDataBooking: Booking) =>
          set({ createDataBooking: createDataBooking }),
        setLoading: (status: boolean) => set({ isLoading: status }),
        setHotelSelected: (hotel: Hotel) => set({ hotelSelected: hotel }),
        setRoomSelected: (room: Room) => set({ roomSelected: room }),
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
          set({
            isLoading: true,
          });
          const res = await getHotels();
          if (res) {
            set({
              hotels: [...res],
              isLoading: false,
            });
          }
        },
        fetchRooms: async (idHotel: string) => {
          set({
            isLoading: true,
          });
          const res = await getRoomsByHotel(idHotel);
          if (res) {
            set({
              rooms: [...res],
              isLoading: false,
            });
          }
        },
        fetchRoomsClient: async (idHotel: string) => {
          const { listIdRooms } = get();
          set({
            isLoading: true,
          });
          const res = await getRoomsByFilter(idHotel, listIdRooms);
          if (res) {
            set({
              rooms: [...res],
              isLoading: false,
            });
          }
        },
        fetchMunicipalities: async () => {
          fetch("https://www.datos.gov.co/resource/xdk5-pm3f.json").then(
            (res) =>
              res.json().then((data) => {
                const datasort = data
                  .map((val: any) => ({
                    value: val.municipio,
                    label: val.municipio,
                  }))
                  .sort((a: any, b: any) =>
                    a.municipio > b.municipio ? 1 : -1
                  );
                set({
                  municipalities: datasort,
                });
              })
          );
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
          set({
            isLoading: true,
          });
          const res = await getBookings();
          if (res) {
            set({
              booking: [...res],
              isLoading: false,
            });
          }
        },
        fetchBooking: async () => {
          set({
            isLoading: true,
          });
          const { userInfo } = get();
          const id = userInfo?.id || "";
          const res = await getBookingByIdUser(id);
          if (res) {
            set({
              booking: [...res],
              isLoading: false,
            });
          }
        },
        fetchBoockingById: async (idBooking: string) => {
          set({
            isLoading: true,
          });
          const res = await getBookingById(idBooking);
          if (res) {
            set({
              roomSelected: res.reference?.rooms,
              hotelSelected: res.reference?.hotels,
              bookingSelect: res.data,
              numberTravels: res.data?.numberTravels,
              totalDays: res.data?.totalDays,
              isLoading: false,
            });
          }
        },
        fetchSearchHotels: async (
          startDate: Timestamp,
          finishDate: Timestamp,
          city: string,
          travels: number
        ) => {
          set({
            isLoading: true,
          });
          const res = await getHotelByFilter(
            startDate,
            finishDate,
            city,
            travels
          );
          if (res) {
            set({
              searchedHotels: [...res.hotels],
              listIdRooms: [...res.listIdRooms],
              focusCity: res.focusCity,
              numberTravels: res.numberTravels,
              travelDate: res.travelDate,
              totalDays: calculateDaysBetweenTimestamps(
                res.travelDate.startDate,
                res.travelDate.finishDate
              ),
              isLoading: false,
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
