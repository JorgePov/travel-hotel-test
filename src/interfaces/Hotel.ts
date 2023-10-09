export interface Hotel {
  checkInTime: string;
  checkOutTime: string;
  comision: number;
  id?: string;
  name: string;
  state: "inactive" | "active";
  city: string;
  address: string;
  phoneNumber: string;
  idImage: number;
}

export interface Room {
  id?: string;
  idHotel: string;
  number: string;
  price: number;
  state: "inactive" | "active";
  tax: number;
  roomType: "compartida" | "sencilla" | "double" | "familiar" | "suit";
  ubication: string;
}
