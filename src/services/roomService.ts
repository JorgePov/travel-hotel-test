import {
  getDocs,
  addDoc,
  query,
  where,
  getDoc,
  doc,
  collection,
  setDoc,
} from "firebase/firestore";
import { db, hotelCollection } from "./db";
import { Hotel } from "../interfaces/Hotel";

/* export const getHoteles = async () => {
  await getDocs(roomCollection).then((data) => {
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
};

export const getHotelsById = async (idhotel: string) => {
  const q = doc(roomCollection, idhotel);
  const data = await getDoc(q);
  return data.data();
};

export const updatedHotel = async (newhotel: Hotel) => {
  try {
    const docRef = await addDoc(roomCollection, {
      ...newhotel,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}; */

export const createdHotel = async (newhotel: Hotel) => {
  try {
    const val = doc(hotelCollection, 'FMPQQbaTurm40xeQLIb5')
    const collectionval = collection(val, 'rooms')
    const docRef = await addDoc(collectionval, { idRoom: 5456465465 });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

/* const hotelExist = async (hotel: Hotel) => {
  const q = query(
    roomCollection,
    where("name", "==", hotel.name),
    where("city", "==", hotel.city)
  );
  const data = await getDocs(q);
  if (data.docs.length) {
    return true;
  }
  return false;
}; */
