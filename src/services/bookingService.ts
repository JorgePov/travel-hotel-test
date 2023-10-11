import {
  addDoc,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";
import {
  bookingCollection,
  hotelCollection,
  roomCollection,
  userCollection,
} from "./db";
import { Booking, BookingApi, Reference } from "../interfaces/Booking";
import { infoEmail, sendCancelation } from "./emailService";
import {
  formatCurrency,
  roomTypeInvert,
  timestampToStringFullDate,
} from "../utils/utils";
import { User } from "../interfaces/User";

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

export const getBookingByIdUser = async (
  idUser: string
): Promise<BookingApi[] | undefined> => {
  const q = query(
    bookingCollection,
    where("idUser", "==", idUser),
    orderBy("startTravel", "asc")
  );
  const querySnapshot = await getDocs(q);
  const dataFilter: BookingApi[] = [];
  for (const doc of querySnapshot.docs) {
    const dataDoc = doc.data();
    let arrayRef: Reference = {};
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
    const querySnapshot = await getDoc(bookingRef);
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

    const userRef = doc(userCollection, bookingData.data?.idUser);
    const userSnapshot = await getDoc(userRef);
    const user = userSnapshot.data() as User;

    let emailsTravels = "";
    if (bookingData.data?.travels) {
      const emails = bookingData.data.travels.map((objeto) => objeto.email);
      emailsTravels = emails.join(", ");
    }

    const dataEmail: infoEmail = {
      emailTo: user.email,
      otherEmail: emailsTravels,
      hotelName: bookingData.reference?.hotels?.name!,
      startTravel: timestampToStringFullDate(bookingData.data?.startTravel!),
      finishTravel: timestampToStringFullDate(bookingData.data?.finishTravel!),
      numberRoom: bookingData.reference?.rooms?.numberRoom!,
      roomType: `Habitacion ${
        roomTypeInvert[bookingData.reference?.rooms?.roomType!]
      }`,
      totalPrice: formatCurrency(bookingData.data?.billing?.total!),
    };
    await updateDoc(bookingRef, {
      state: newState,
    });
    await sendCancelation(dataEmail);
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
