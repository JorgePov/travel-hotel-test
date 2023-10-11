import { User, loginData } from "../interfaces/User";
import {
  getDocs,
  addDoc,
  query,
  where,
  getDoc,
  doc,
  and,
  updateDoc,
} from "firebase/firestore";
import { userCollection } from "./db";

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

export const createdUser = async (newUser: User): Promise<User> => {
  const isExist = await userExist(newUser);
  if (isExist) {
    throw new Error("El Correo ya fue usado");
  }
  const docRef = await addDoc(userCollection, {
    ...newUser,
  });
  try {
    const docSnapshot = await getDoc(docRef);
    const userData = docSnapshot.data() as User;
    const user: User = { id: docSnapshot.id, ...userData };
    delete user.password;
    return user;
  } catch (error) {
    throw new Error("Error de servidor");
  }
};

const userExist = async (user: User) => {
  const q = query(
    userCollection,
    where("documentType", "==", user.documentType),
    where("document", "==", user.document),
    where("email", "==", user.email)
  );
  const data = await getDocs(q);
  if (data.docs.length) {
    return true;
  }
  return false;
};

export const loginUser = async (credencial: loginData): Promise<User> => {
  const q = query(
    userCollection,
    and(
      where("email", "==", credencial.email),
      where("password", "==", credencial.password)
    )
  );
  const data = await getDocs(q);
  if (data.docs.length) {
    const [firstDocument] = data.docs;
    const userData = firstDocument.data() as User;
    const user: User = { id: firstDocument.id, ...userData };
    delete user.password;
    return user;
  }
  throw new Error("Credenciales incorrectas");
};
