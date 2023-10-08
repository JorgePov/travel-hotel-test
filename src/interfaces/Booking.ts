import { Travels } from "./User";

export interface Booking {
  id: string;
  emergencyContact?: EmergencyContact;
  idRoom: string;
  idHotel: string;
  idUser: string;
  travels?: Array<Travels>;
  startTravel?: Date;
  finishTravel?: Date;
  state: "inactive" | "active";
}

interface EmergencyContact {
  name: string;
  phoneNumber: string;
}
