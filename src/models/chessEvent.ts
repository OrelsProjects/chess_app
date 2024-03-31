import { ChessEventParticipant } from "./chessEventParticipant";

export const eventTypeToName = (type?: GameType) => {
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

export type GameType = "bullet" | "blitz" | "rapid" | "classical";

export interface ChessEvent {
  id: string;
  name: string;
  description: string;
  date: number;
  time: string;
  price?: number;
  image?: string;
  location?: string;
  rated?: boolean;
  ratedFide?: boolean;
  isPaymentRequired: boolean;
  type: GameType;
}

type ChessEventImage = { imageFile: File | null };

export type CreateChessEvent = Omit<ChessEvent, "id"> & ChessEventImage;
export type UpdateChessEvent = ChessEvent & ChessEventImage;

export type ChessEvenData = ChessEvent & {
  participants?: ChessEventParticipant[];
};
