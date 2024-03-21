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

export type CreateChessEvent = Omit<ChessEvent, "id"> & { imageFile: File | null };
