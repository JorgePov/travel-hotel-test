import { Travels } from "./User";

export interface booking { 
    emergencyContact: emergencyContact;
    idRoom: String;
    idUser: String;
    travels: Array<Travels>;
}


interface emergencyContact{
    name: String;
    phoneNumber: String;
}