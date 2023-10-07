import { initializeApp } from "firebase/app";
import { CollectionReference, doc, getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { booking } from "../interfaces/Booking";

interface newSubcollection {
  collectionFather: CollectionReference;
  collectionFatherID: string;
  nameSubCollection: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyCVLB1gG9Yhl6qDCIE8fKtEXtja1LK5_Wc",
  authDomain: "backend-travel-hotel-test.firebaseapp.com",
  projectId: "backend-travel-hotel-test",
  storageBucket: "backend-travel-hotel-test.appspot.com",
  messagingSenderId: "803949590441",
  appId: "1:803949590441:web:90e3cdf3732d9da52f76b8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const userCollection = collection(db, "users");
export const hotelCollection = collection(db, "hotels");

export const roomColletion = (collectionHotelID: string) => {
  const collectionHotel = doc(hotelCollection, collectionHotelID);
  return collection(collectionHotel, "rooms");
};

export const bookingColletion = collection(db, "booking");