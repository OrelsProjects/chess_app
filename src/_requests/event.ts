import { setDoc } from "firebase/firestore";
import { ChessEvent } from "../models/chessEvent";
import { getEventDoc } from "./common";

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
