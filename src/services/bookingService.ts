import {
  addDoc,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  where,
  and,
} from "firebase/firestore";
import { bookingCollection, db, hotelCollection, roomCollection } from "./db";
import { Booking } from "../interfaces/Booking";

export const getBookings = async () => {
  return await getDocs(bookingCollection).then((data) => {
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
};

export const getBookingById = async (idUser: string) => {
  const q = query(bookingCollection, where("idUser", "==", idUser));
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
  console.log(dataFilter);
  return dataFilter;
};

const exampleReference = async (idUser: string) => {
  const usuarioRef = doc(bookingCollection, "HdQKGsD2pgQvR8iPcgR3");
  const usuarioDoc = await getDoc(usuarioRef);
  const fullData = [];
  if (usuarioDoc.exists()) {
    const referencias = usuarioDoc.data().referencias;
    const documentosAsociados = [];
    for (const referencia of referencias) {
      const documentoRef = doc(db, referencia.path);
      const documentoSnap = await getDoc(documentoRef);

      if (documentoSnap.exists()) {
        documentosAsociados.push(documentoSnap.data());
      }
    }

    fullData.push({ data: usuarioDoc.data(), reference: documentosAsociados });

    console.log("Documentos asociados:", fullData);
  }
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
    const referencias = [
      doc(hotelCollection, newBooking.idHotel),
      doc(roomCollection(newBooking.idHotel), newBooking.idRoom),
    ];
    await updateDoc(docRef, { referencias });
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
