import { User } from "../interfaces/User";
import {
  getDocs,
  addDoc,
  query,
  where,
  getDoc,
  doc,
  or,
  and,
} from "firebase/firestore";
import { userCollection } from "./db";

export const getUsers = async () => {
  await getDocs(userCollection).then((data) => {
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
};

export const getUsersById = async (idUser: string) => {
  const q = doc(userCollection, idUser);
  const data = await getDoc(q);
  return data.data();
};

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

type loginData = {
  email: String;
  password: String;
};

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
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  }
  throw new Error("ãlo põl˜ia");
};
