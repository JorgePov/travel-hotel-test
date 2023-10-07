import {
  addDoc,
} from "firebase/firestore";
import { Hotel } from "../interfaces/Hotel";
import { hotelCollection, newSubcolletion } from "./db";

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

export const createRoom = async (newhotel: Hotel) => {
  try {
    //get Hotel Collection
    const subcollection = newSubcolletion({
      collectionFather: hotelCollection,
      collectionFatherID: 'lFUfUFPK2png7Jzk66mO',
      nameSubCollection: 'rooms'
    })
    //insert room data
    const docRef = await addDoc(subcollection, { idRoom: 5456465465 });
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
