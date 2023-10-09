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

    const user: User = docSnapshot.data() as User;
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

/* const data = await getDocs(q);
  if (data.docs.length) {
    let usuarios!: User;
    data.forEach((doc) => {
      const usuario = doc.data() as User;
      usuarios = { id: doc.id, ...usuario };
    });
    return usuarios; */

//login
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
