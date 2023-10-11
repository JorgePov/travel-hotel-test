import { Timestamp } from "firebase/firestore";
import { Hotel, Room } from "./Hotel";
import { Travels } from "./User";

export interface Booking {
  id?: string;
  emergencyContact?: EmergencyContact;
  idRoom?: string;
  idHotel?: string;
  idUser?: string;
  travels?: Array<Travels>;
  startTravel?: Timestamp;
  finishTravel?: Timestamp;
  state?: "Completada" | "Cancelada" | "Reservada";
  numberTravels?: number;
  totalDays?: number;
  billing?: Billing;
}

export interface Billing {
  price: number;
  tax: number;
  total: number;
}

export interface Reference {
  hotels?: Hotel;
  rooms?: Room;
}

export interface BookingApi {
  data?: Booking;
  reference?: Reference;
}

export interface EmergencyContact {
  name: string;
  phoneNumber: string;
}
