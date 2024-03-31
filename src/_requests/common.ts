import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { EventNotExistsError } from "../models/errors/EventNotExistsError";
import { userConvereter } from "./converters/UserConverter";
import { chessEventConverter } from "./converters/ChessEvents";
import { ChessEvenData } from "../models/chessEvent";

export const collections = {
  users: "users",
  events: "events",
};

export const usersCol = collection(db, collections.users);
export const getUserDoc = (userId: string) =>
  doc(usersCol, userId).withConverter(userConvereter);

export const eventsCol = collection(db, collections.events);
export const getEventDoc = (
  eventId?: string
): DocumentReference<ChessEvenData, DocumentData> =>
  (eventId ? doc(eventsCol, eventId) : doc(eventsCol)).withConverter(
    chessEventConverter
  );

export const validateEventExists = async (eventId: string) => {
  const docSnap = await getDoc(getEventDoc(eventId));
  if (!docSnap.exists()) {
    throw new EventNotExistsError();
  }
};
