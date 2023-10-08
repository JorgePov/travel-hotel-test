import {
  addDoc,
  collectionGroup,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  where,
  and,
} from "firebase/firestore";
import { bookingCollection } from "./db";
import { Booking } from "../interfaces/Booking";

export const getBookings = async () => {
  return await getDocs(bookingCollection).then((data) => {
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
};

export const getMyTravel = async (idBooking: string) => {
  const q = doc(bookingCollection, idBooking);
  const data = await getDoc(q);
  return data.data();
};

export const updatedBooking = async (newBooking: Booking) => {
  try {
    const bookingRef = doc(bookingCollection, newBooking.id);
    await updateDoc(bookingRef, {
      ...newBooking,
    });
    return "Cambio exitoso";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deletedBooking = async (idBooking: String) => {
  return idBooking;
};

export const createBooking = async (newBooking: Booking) => {
  try {
    const isExist = await bookingExist(newBooking);
    if (isExist) {
      return " existe";
    }
    const docRef = await addDoc(bookingCollection, {
      ...newBooking,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const bookingExist = async (booking: Booking) => {
  const q = query(
    bookingCollection,
    and(
      where("idHotel", "==", booking.idHotel),
      where("idRoom", "==", booking.idRoom),
      where("startTravel", ">=", booking.startTravel),
      where("finishTravel", "<=", booking.finishTravel)
    )
  );
  const data = await getDocs(q);
  if (data.docs.length) {
    return true;
  }
  return false;
};
