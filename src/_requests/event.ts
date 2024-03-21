import { getDocs, query, setDoc } from "firebase/firestore";
import { ChessEvent } from "../models/chessEvent";
import { eventsCol, getEventDoc } from "./common";
import { chessEventConverter } from "./converters/ChessEvents";

export const createEvent = async (
  event: Omit<ChessEvent, "id">
): Promise<ChessEvent> => {
  const doc = getEventDoc();
  await setDoc(getEventDoc(), event);
  return {
    ...event,
    id: doc.id,
  };
};

export const GetEvents = async (): Promise<ChessEvent[]> => {
  const col = eventsCol;
  const q = query(col).withConverter(chessEventConverter);
  const querySnapshot = await getDocs(q);
  const events: ChessEvent[] = [];
  querySnapshot.forEach((doc) => {
    const event: ChessEvent = doc.data();
    event.id = doc.id;
    events.push(event);
  });
  return events;
};
