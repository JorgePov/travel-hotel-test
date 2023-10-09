import {
  getDocs,
  addDoc,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { hotelCollection } from "./db";
import { Hotel } from "../interfaces/Hotel";

//traer todos
export const getHotels = async (): Promise<Hotel[] | undefined> => {
  const data = await getDocs(hotelCollection);
  if (data.docs.length) {
    let hotels: Hotel[] = [];
    data.forEach((doc) => {
      const hotel = doc.data() as Hotel;
      hotels.push({ id: doc.id, ...hotel });
    });
    return hotels;
  }
};

export const changedStateHotel = async (idHotel: string, newState: string) => {
  try {
    const bookingRef = doc(hotelCollection, idHotel);
    await updateDoc(bookingRef, {
      state: newState,
    });
  } catch (error) {
    console.error("Error al actualizar:", error);
  }
};

//traer por id
export const getHotelsById = async (idhotel: string) => {
  const q = doc(hotelCollection, idhotel);
  const data = await getDoc(q);
  return data.data();
};

//actualizar Hotel
export const updatedHotel = async (newhotel: Hotel) => {
  try {
    const hotelRef = doc(hotelCollection, newhotel.id);
    await updateDoc(hotelRef, {
      ...newhotel,
    });
    return "Cambio exitoso";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//Crear Hotel
export const createdHotel = async (newhotel: Hotel) => {
  try {
    const isExist = await hotelExist(newhotel);
    if (isExist) {
      return " existe";
    }
    const docRef = await addDoc(hotelCollection, {
      ...newhotel,
    });
    console.log("id documnete created: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const hotelExist = async (hotel: Hotel) => {
  const q = query(
    hotelCollection,
    where("name", "==", hotel.name),
    where("city", "==", hotel.city)
  );
  const data = await getDocs(q);
  if (data.docs.length) {
    return true;
  }
  return false;
};
