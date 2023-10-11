import {
  addDoc,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Room } from "../interfaces/Hotel";
import { roomCollection, hotelCollection } from "./db";

export const getRoomsByHotel = async (
  idHotel: string
): Promise<Room[] | undefined> => {
  const data = await getDocs(roomCollection(idHotel));
  if (data.docs.length) {
    let rooms: Room[] = [];
    data.forEach((doc) => {
      const room = doc.data() as Room;
      rooms.push({ id: doc.id, ...room });
    });
    return rooms;
  }
};

export const getRoomsByFilter = async (
  idHotel: string,
  listIDRooms: string[]
): Promise<Room[] | undefined> => {
  const data = await getDocs(roomCollection(idHotel));
  if (data.docs.length) {
    let rooms: Room[] = [];
    data.forEach((doc) => {
      const room = doc.data() as Room;
      if (!listIDRooms.some((val) => val === doc.id)) {
        rooms.push({ id: doc.id, ...room });
      }
    });
    return rooms;
  }
};

export const changedStateRoom = async (
  idRoom: string,
  idHotel: string,
  newState: string
) => {
  try {
    const roomRef = doc(roomCollection(idHotel), idRoom);
    await updateDoc(roomRef, {
      state: newState,
    });
  } catch (error) {
    console.error("Error al actualizar:", error);
  }
};

export const getRoomsById = async (idRoom: string, idromm: string) => {
  const q = doc(roomCollection(idRoom), idromm);
  const data = await getDoc(q);
  return data.data();
};

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

export const createdRoom = async (newRoom: Room) => {
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
    where("number", "==", room.numberRoom),
    where("roomType", "==", room.roomType)
  );
  const data = await getDocs(q);
  if (data.docs.length) {
    return true;
  }
  return false;
};
