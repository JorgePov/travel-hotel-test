import { addDoc } from "firebase/firestore";
import { Hotel } from "../interfaces/Hotel";
import { bookingColletion } from "./db";
import { booking } from "../interfaces/Booking";

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

export const createBooking = async (newBooking: booking) => {
  try {
    const docRef = await addDoc(bookingColletion, {
      ...newBooking,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

/* export const filterTravelTime = async (
  startTravel: Date,
  finishTravel: Date
) => {
  await getDocs(roomCollection).then((data) => {
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
}; */
