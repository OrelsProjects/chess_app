import {
  getDocs,
  query,
  setDoc,
  where,
  deleteField,
  updateDoc,
  DocumentReference,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { ChessEvenData, ChessEvent } from "../models/chessEvent";
import { validateEventExists, eventsCol, getEventDoc } from "./common";
import { chessEventConverter } from "./converters/ChessEvents";
import { ChessEventParticipant } from "../models/chessEventParticipant";

export const updateEvent = async (
  event: ChessEvenData
): Promise<ChessEvenData> => {
  validateEventExists(event.id);
  await setDoc(getEventDoc(event.id), event, { merge: true });
  return event;
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

  await setDoc(
    doc,
    {
      participants: {
        [participant.userId]: data,
      },
    },
    { merge: true }
  );
};

export const createEvent = async (
  event: Omit<ChessEvent, "id">
): Promise<ChessEvent> => {
  const doc = getEventDoc();
  const eventData = { ...event, isDeleted: false };
  await setDoc(doc, { ...eventData, id: doc.id });
  return {
    ...event,
    id: doc.id,
  };
};

export const GetEvents = async (): Promise<ChessEvenData[]> => {
  const col = eventsCol;
  const q = query(col, where("isDeleted", "==", false)).withConverter(
    chessEventConverter
  );
  const events = await getDocs(q);

  return events.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
