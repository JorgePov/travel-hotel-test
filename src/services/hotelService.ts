import {
  getDocs,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { bookingCollection, hotelCollection } from "./db";
import { Hotel } from "../interfaces/Hotel";

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

const getListIdRooms = async (startDate: Timestamp, finishDate: Timestamp) => {
  const startTravelQuery = query(
    bookingCollection,
    where("state", "==", "Reservada")
  );
  const queryRun = await getDocs(startTravelQuery);
  const listIdRooms: string[] = [];
  queryRun.docs.map((doc) => {
    if (
      (doc.data().startTravel.toMillis() >= startDate.toMillis() &&
        finishDate.toMillis() >= doc.data().startTravel.toMillis()) ||
      (doc.data().finishTravel.toMillis() <= finishDate.toMillis() &&
        startDate.toMillis() <= doc.data().finishTravel.toMillis())
    ) {
      listIdRooms.push(doc.data().idRoom);
    }
    return doc;
  });

  return { listIdRooms };
};

const getHotelsByCity = async (city: string) => {
  const q = query(
    hotelCollection,
    where("city", "==", city),
    where("state", "==", "active")
  );
  const querySnapshot = await getDocs(q);
  let hotels: Hotel[] = [];
  querySnapshot.forEach((doc) => {
    const hotel = doc.data() as Hotel;
    hotels.push({ id: doc.id, ...hotel });
  });
  return { hotels };
};

interface dataFilter {
  travelDate: {
    startDate: Timestamp;
    finishDate: Timestamp;
  };
  listIdRooms: string[];
  focusCity: string;
  hotels: Hotel[];
  numberTravels: number;
}

export const getHotelByFilter = async (
  startDate: Timestamp,
  finishDate: Timestamp,
  city: string,
  travels: number
): Promise<dataFilter | undefined> => {
  try {
    const { listIdRooms } = await getListIdRooms(startDate, finishDate);
    const { hotels } = await getHotelsByCity(city);

    const response = {
      travelDate: {
        startDate,
        finishDate,
      },
      listIdRooms,
      focusCity: city,
      hotels: hotels,
      numberTravels: travels,
    };
    return response;
  } catch (error) {
    console.log(error);
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
