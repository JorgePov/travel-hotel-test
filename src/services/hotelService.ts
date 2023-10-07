import { getDocs, addDoc, query, where, getDoc, doc } from "firebase/firestore";
import { hotelCollection } from "./db";
import { Hotel } from "../interfaces/Hotel";

export const getHoteles = async () => {
  await getDocs(hotelCollection).then((data) => {
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
};

export const getHotelsById = async (idhotel: string) => {
  const q = doc(hotelCollection, idhotel);
  const data = await getDoc(q);
  return data.data();
};

export const updatedHotel = async (newhotel: Hotel) => {
  try {
    const docRef = await addDoc(hotelCollection, {
      ...newhotel,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createdHotel = async (newhotel: Hotel) => {
  try {
    const isExist = await hotelExist(newhotel);
    if (isExist) {
      return " existee";
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
