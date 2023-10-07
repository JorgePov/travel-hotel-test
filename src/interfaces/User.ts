export interface User extends personalInfo {
  id?: String;
  password: String;
  type: "travel" | "admin";
}

interface personalInfo {
  document: String;
  documentType: "CC" | "DE" | "PA";
  email: String;
  genre: String;
  lastName: String;
  name: String;
  phoneNumber: String;
}

export interface Travels extends personalInfo {
  id?: String;
}
