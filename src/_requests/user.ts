import { getDoc, setDoc } from "firebase/firestore";
import User from "../models/user";
import { getUserDoc } from "./common";

const upsertUser = async (user: User): Promise<User> => {
  let userFromDb = await getDoc(getUserDoc(user.userId));
  if (!userFromDb.exists()) {
    setDoc(getUserDoc(user.userId), { ...user });
  }
  return {
    ...user,
    ...userFromDb.data(),
  };
};

const getUser = async (userId: string, token: string): Promise<User> => {
  const userFromDb = await getDoc(getUserDoc(userId));
  return {
    userId: userFromDb.id,
    displayName: userFromDb.data()?.displayName,
    email: userFromDb.data()?.email,
    photoURL: userFromDb.data()?.photoURL,
    birthDate: userFromDb.data()?.birthDate,
    role: userFromDb.data()?.role,
    token,
  };
};

export { upsertUser, getUser };
