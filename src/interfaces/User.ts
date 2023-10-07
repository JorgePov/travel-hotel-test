export interface User extends personalInfo {
  id?: string;
  password: string;
  type: "travel" | "admin";
}

interface personalInfo {
  document: string;
  documentType: "CC" | "DE" | "PA";
  email: string;
  genre: string;
  lastName: string;
  name: string;
  phoneNumber: string;
}

export interface Travels extends personalInfo {
  id?: string;
}
