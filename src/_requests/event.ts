import {
  getDocs,
  query,
  setDoc,
  where,
  deleteField,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { ChessEvenData, ChessEvent } from "../models/chessEvent";
import { validateEventExists, eventsCol, getEventDoc } from "./common";
import { ChessEventParticipant } from "../models/chessEventParticipant";

export type ChessEventDataFirestore = Omit<ChessEvenData, "date"> & {
  date: Timestamp;
};

export const updateEvent = async (
  event: ChessEventDataFirestore
): Promise<ChessEvenData> => {
  validateEventExists(event.id);
  await setDoc(getEventDoc(event.id), event, { merge: true });
  return { ...event, date: event.date.toMillis() };
};

export const deleteEvent = async (id: string): Promise<void> =>
  await deleteDoc(getEventDoc(id));

export const unregisterFromEvent = async (
  eventId: string,
  participantId: string
) => {
  validateEventExists(eventId);
  const doc = getEventDoc(eventId);
  const updateObject = {
    [`participants.${participantId}`]: deleteField(),
  };

  await updateDoc(doc, updateObject);
};

export const registerToEvent = async (
  eventId: string,
  participantId: string
) => {
  validateEventExists(eventId);
  const doc = getEventDoc(eventId);

  const participant: ChessEventParticipant = {
    eventId,
    userId: participantId,
  };
  const data = {
    ...participant,
    updatedAt: new Date().toISOString(),
  };

  await updateDoc(doc, {
    participants: {
      [participant.userId]: data,
    },
  });
};

export const createEvent = async (
  event: Omit<ChessEventDataFirestore, "id">
): Promise<ChessEvent> => {
  const doc = getEventDoc();
  const eventData = { ...event, isDeleted: false };
  await setDoc(doc, { ...eventData, id: doc.id });
  return {
    ...event,
    date: event.date.toMillis(),
    id: doc.id,
  };
};

export const GetEvents = async (): Promise<ChessEvenData[]> => {
  const col = eventsCol;
  // date formatted as yyyy-mm-dd
  const dateFormatted = new Date();

  const q = query(
    col,
    where("isDeleted", "==", false),
    where("date", ">=", dateFormatted)
  );

  const events = await getDocs(q);

  return events.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
