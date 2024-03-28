import { getDoc, setDoc, updateDoc } from "firebase/firestore";
import User from "../models/user";
import { getUserDoc } from "./common";
import PlayerDetails from "../models/playerDetails";
import { UserFullData } from "../models/types/userFullData";

const upsertUser = async (user: User): Promise<UserFullData> => {
  let userFromDb = await getDoc(getUserDoc(user.userId));
  if (!userFromDb.exists()) {
    setDoc(getUserDoc(user.userId), { ...user });
  }
  return {
    ...user,
    ...userFromDb.data(),
  };
};

const upsertUserPlayerDetails = async (
  userId: string,
  playerDetails: PlayerDetails
): Promise<void> => await updateDoc(getUserDoc(userId), { playerDetails });

const getUser = async (
  userId: string,
  token?: string
): Promise<UserFullData | null> => {
  const userFromDb = await getDoc(getUserDoc(userId));
  const data = userFromDb.data();
  if (!data) return null;
  let user: UserFullData = {
    userId: userFromDb.id,
    displayName: data?.displayName,
    email: data?.email || "",
    photoURL: data?.photoURL,
    birthDate: data?.birthDate,
    role: data?.role || "user",
    token: token || "",
    playerDetails: data?.playerDetails,
  };
  return user;
};

export { upsertUser, getUser, upsertUserPlayerDetails };
