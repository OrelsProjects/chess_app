import { getDocs, or, query, setDoc, where } from "firebase/firestore";
import { ChessEvent } from "../models/chessEvent";
import { eventsCol, getEventDoc } from "./common";
import { chessEventConverter } from "./converters/ChessEvents";

export const updateEvent = async (event: ChessEvent): Promise<ChessEvent> => {
  await setDoc(getEventDoc(event.id), event, { merge: true });
  return event;
};

export const deleteEvent = async (id: string): Promise<void> =>
  await setDoc(getEventDoc(id), { isDeleted: true }, { merge: true });

export const createEvent = async (
  event: Omit<ChessEvent, "id">
): Promise<ChessEvent> => {
  const doc = getEventDoc();
  const eventData = { ...event, isDeleted: false };
  await setDoc(getEventDoc(), eventData);
  return {
    ...event,
    id: doc.id,
  };
};

export const GetEvents = async (): Promise<ChessEvent[]> => {
  const col = eventsCol;
  // isDeleted == false or isDeleted == undefined
  const q = query(col, where("isDeleted", "==", false)).withConverter(
    chessEventConverter
  );
  const events = await getDocs(q);

  return events.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
