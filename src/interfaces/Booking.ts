import { Travels } from "./User";

export interface booking {
  emergencyContact?: emergencyContact;
  idRoom: string;
  idHotel: string;
  idUser: string;
  travels?: Array<Travels>;
  startTravel?: Date;
  finishTravel?: Date;
}

interface emergencyContact {
  name: string;
  phoneNumber: string;
}
