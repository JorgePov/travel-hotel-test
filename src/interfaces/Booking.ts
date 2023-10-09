import { Hotel, Room } from "./Hotel";
import { Travels } from "./User";

export interface Booking {
  id?: string;
  emergencyContact?: EmergencyContact;
  idRoom: string;
  idHotel: string;
  idUser: string;
  travels?: Array<Travels>;
  startTravel?: Date;
  finishTravel?: Date;
  state?: "Completada" | "Cancelada" | "Reservada";
}

interface Reference {
  hotels: Hotel;
  rooms: Room;
}

export interface BookingApi {
  data: Booking;
  reference: Reference;
}

interface EmergencyContact {
  name: string;
  phoneNumber: string;
}
