import { ChessEventParticipant } from "./chessEventParticipant";

export const eventTypeToName = (type?: EventType) => {
  switch (type) {
    case "bullet":
      return "קליע";
    case "blitz":
      return "בזק";
    case "rapid":
      return "מהיר";
    case "classical":
      return "קלאסי";
  }
};

export type EventType = "bullet" | "blitz" | "rapid" | "classical";

export interface ChessEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  price?: number;
  image?: string;
  location?: string;
  rated?: boolean;
  ratedFide?: boolean;
  type: EventType;
}

type ChessEventImage = { imageFile: File | null };

export type CreateChessEvent = Omit<ChessEvent, "id"> & ChessEventImage;
export type UpdateChessEvent = ChessEvent & ChessEventImage;

export type ChessEvenData = ChessEvent & {
  participants?: ChessEventParticipant[];
};
