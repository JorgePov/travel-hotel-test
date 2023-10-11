import {
  addDoc,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  where,
  and,
  orderBy,
} from "firebase/firestore";
import { bookingCollection, hotelCollection, roomCollection } from "./db";
import { Booking, BookingApi } from "../interfaces/Booking";

export const getBookings = async () => {
  const querySnapshot = await getDocs(bookingCollection);
  const dataFilter = [];
  for (const doc of querySnapshot.docs) {
    const dataDoc = doc.data();
    let arrayRef = {
      hotels: {},
      rooms: {},
    };
    for (const ref of dataDoc.referencias) {
      const docRef = await getDoc(ref);
      if (docRef.exists()) {
        arrayRef = { ...arrayRef, [ref.parent.id]: docRef.data() };
      }
    }
    dataFilter.push({
      data: { id: doc.id, ...dataDoc },
      reference: arrayRef,
    });
  }
  return dataFilter;
};

export const getBookingById = async (
  idBooking: string
): Promise<BookingApi | undefined> => {
  const queryId = doc(bookingCollection, idBooking);
  const querySnapshot = await getDoc(queryId);
  let bookingData: BookingApi = {
    data: querySnapshot.data(),
  };
  if (querySnapshot.exists()) {
    for (const ref of querySnapshot.data().referencias) {
      const docRef = await getDoc(ref);
      if (docRef.exists()) {
        bookingData.reference = {
          ...bookingData.reference,
          [ref.parent.id]: docRef.data(),
        };
      }
    }
  }
  return bookingData;
};

export const getBookingByIdUser = async (idUser: string) => {
  const q = query(
    bookingCollection,
    where("idUser", "==", idUser),
    orderBy("startTravel", "asc")
  );
  const querySnapshot = await getDocs(q);
  const dataFilter = [];
  for (const doc of querySnapshot.docs) {
    const dataDoc = doc.data();
    let arrayRef = {
      hotels: {},
      rooms: {},
    };
    for (const ref of dataDoc.referencias) {
      const docRef = await getDoc(ref);
      if (docRef.exists()) {
        arrayRef = { ...arrayRef, [ref.parent.id]: docRef.data() };
      }
    }
    dataFilter.push({
      data: { id: doc.id, ...dataDoc },
      reference: arrayRef,
    });
  }
  return dataFilter;
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

export const changedStateBooking = async (
  idBooking: string,
  newState: string
) => {
  try {
    const bookingRef = doc(bookingCollection, idBooking);
    await updateDoc(bookingRef, {
      state: newState,
    });
  } catch (error) {
    console.error("Error al actualizar:", error);
  }
};

export const createBooking = async (newBooking: Booking) => {
  try {
    const docRef = await addDoc(bookingCollection, {
      ...newBooking,
    });
    const referencias = [
      doc(hotelCollection, newBooking.idHotel),
      doc(roomCollection(newBooking.idHotel!), newBooking.idRoom),
    ];
    await updateDoc(docRef, { referencias });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
