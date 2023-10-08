import {
  getDocs,
  addDoc,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { hotelCollection, db } from "./db";
import { Hotel } from "../interfaces/Hotel";

//traer todos
export const getHoteles = async () => {
  const isActive = query(hotelCollection, where("state", "==", "active"));
  return await getDocs(isActive).then((data) => {
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
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
    console.log("Document written with ID: ", docRef.id);
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
