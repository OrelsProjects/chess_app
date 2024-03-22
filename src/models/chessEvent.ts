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
}

type ChessEventImage = { imageFile: File | null };

export type CreateChessEvent = Omit<ChessEvent, "id"> & ChessEventImage;
export type UpdateChessEvent = ChessEvent & ChessEventImage;
