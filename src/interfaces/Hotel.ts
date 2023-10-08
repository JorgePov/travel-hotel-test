export interface Hotel {
  checkInTime: string;
  checkOutTime: string;
  comision: Number;
  id?: string;
  name: string;
  state: "inactive" | "active";
  city: string;
}

export interface Room {
  id?: string;
  idHotel: string;
  number: string;
  price: Number;
  state: "inactive" | "active";
  tax: Number;
  roomType: "compartida" | "sencilla" | "double" | "familiar" | "suit";
  ubication: string;
}
