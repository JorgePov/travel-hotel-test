export interface User extends PersonalInfo {
  id?: string;
  password: string;
  type: "travel" | "admin";
}

interface PersonalInfo {
  document: string;
  documentType: "CC" | "DE" | "PA";
  email: string;
  genre: string;
  lastName: string;
  name: string;
  phoneNumber: string;
}

export interface Travels extends PersonalInfo {
  id?: string;
}

export type loginData = {
  email: string;
  password: string;
};
