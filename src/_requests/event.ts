import { setDoc } from "firebase/firestore";
import { ChessEvent } from "../models/event";
import { getEventDoc } from "./common";

export const createEvent = async (event: ChessEvent): Promise<ChessEvent> => {
  const doc = getEventDoc();
  await setDoc(getEventDoc(), event);
  return {
    ...event,
    id: doc.id,
  };
};
