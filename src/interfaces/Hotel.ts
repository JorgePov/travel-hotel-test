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
  numberRoom: string;
  price: number;
  state: "inactive" | "active";
  tax: number;
  roomType: "shared" | "simple" | "double" | "family" | "suit";
  ubication: string;
  description: string;
}
