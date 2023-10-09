import {
  addDoc,
  collectionGroup,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Room } from "../interfaces/Hotel";
import { roomCollection, db, hotelCollection } from "./db";

export const getRooms = async () => {
  const dataDb = query(collectionGroup(db, "rooms"));
  return await getDocs(dataDb).then((data) => {
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
};

export const deletedRoom = async (idRoom: String) => {
  return idRoom;
};

export const getRoomsById = async (idRoom: string, idromm: string) => {
  const q = doc(roomCollection(idRoom), idromm);
  const data = await getDoc(q);
  return data.data();
};

//actualizar Room
export const updatedRoom = async (newRoom: Room) => {
  try {
    const RoomRef = doc(roomCollection(newRoom.idHotel), newRoom.id);
    await updateDoc(RoomRef, {
      ...newRoom,
    });
    return "Cambio exitoso";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//creacion
export const createRoom = async (newRoom: Room) => {
  try {
    const isExist = await roomExist(newRoom);
    if (isExist) {
      return " existe";
    }
    const docRef = await addDoc(roomCollection(newRoom.idHotel), {
      ...newRoom,
    });
    const hotelRef = doc(hotelCollection, newRoom.idHotel);

    const referencias = [doc(roomCollection(newRoom.idHotel), docRef.id)];
    await updateDoc(hotelRef, { referencias });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const roomExist = async (room: Room) => {
  const q = query(
    roomCollection(room.idHotel),
    where("number", "==", room.number),
    where("roomType", "==", room.roomType)
  );
  const data = await getDocs(q);
  if (data.docs.length) {
    return true;
  }
  return false;
};
