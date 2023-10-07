export interface Hotel {
  checkIn: String;
  checkOut: String;
  comision: Number;
  id?: String;
  name: String;
  state: "inactive" | "active";
  city: String;
}

export interface Room {
  id?: String;
  idHotel: String;
  name: String;
  price: Number;
  scheduler: Array<Date>;
  state: "inactive" | "active";
  status: "busy" | "empty";
  tax: Number;
  roomType: "compartida" | "sencilla" | "double" | "familiar" | "suit";
  ubication: String;
}
