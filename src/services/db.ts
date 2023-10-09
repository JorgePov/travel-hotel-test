import { initializeApp } from "firebase/app";
import { doc, getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: "backend-travel-hotel-test.firebaseapp.com",
  projectId: "backend-travel-hotel-test",
  storageBucket: "backend-travel-hotel-test.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const userCollection = collection(db, "users");
export const hotelCollection = collection(db, "hotels");

export const roomCollection = (collectionHotelID: string) => {
  const collectionHotel = doc(hotelCollection, collectionHotelID);
  return collection(collectionHotel, "rooms");
};

export const bookingCollection = collection(db, "booking");
