import { User, loginData } from "../interfaces/User";
import {
  getDocs,
  addDoc,
  query,
  where,
  getDoc,
  doc,
  or,
  and,
  updateDoc,
} from "firebase/firestore";
import { userCollection } from "./db";

//traer a todos
export const getUsers = async () => {
  return await getDocs(userCollection).then((data) => {
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
};

//traer por id
export const getUsersById = async (idUser: string) => {
  const q = doc(userCollection, idUser);
  const data = await getDoc(q);
  return data.data();
};

//actualizar User
export const updatedUser = async (newUser: User) => {
  try {
    const hotelRef = doc(userCollection, newUser.id);
    await updateDoc(hotelRef, {
      ...newUser,
    });
    return "Cambio exitoso";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//crear usuario
export const createdUser = async (newUser: User) => {
  try {
    const isExist = await userExist(newUser);
    if (isExist) {
      return " existeeee";
    }
    const docRef = await addDoc(userCollection, {
      ...newUser,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const userExist = async (user: User) => {
  const q = query(
    userCollection,
    or(where("email", "==", user.email), where("document", "==", user.document))
  );
  const data = await getDocs(q);
  if (data.docs.length) {
    return true;
  }
  return false;
};

//login
export const loginUser = async (credencial: loginData) => {
  const q = query(
    userCollection,
    and(
      where("email", "==", credencial.email),
      where("password", "==", credencial.password)
    )
  );
  const data = await getDocs(q);
  if (data.docs.length) {
    return data.docs.map((doc) => {
      const data = doc.data();
      delete data.password;
      return {
        ...data,
        id: doc.id,
      };
    });
  }
  throw new Error("no auth");
};
