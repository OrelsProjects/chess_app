import { collection, doc } from "firebase/firestore";
import { db } from "../../firebase.config";

export const collections = {
  users: "users",
  events: "events",
};

export const userCol = collection(db, collections.users);
export const getUserDoc = (userId: string) => doc(userCol, userId);

export const eventsCol = collection(db, collections.events);
export const getEventDoc = (eventId?: string) =>
  eventId ? doc(eventsCol, eventId) : doc(eventsCol);
