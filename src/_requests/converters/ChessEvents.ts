import { FirestoreDataConverter } from "firebase/firestore";
import { ChessEvent } from "../../models/chessEvent";

export const chessEventConverter: FirestoreDataConverter<ChessEvent> = {
  toFirestore(chessEvent: ChessEvent): any {
    return chessEvent;
  },
  fromFirestore(snapshot, options): ChessEvent {
    const data = snapshot.data(options);
    return {
      id: snapshot.id as string,
      name: data.name as string,
      date: data.date as string,
      location: data.location as string,
      description: data.description as string,
      ...data,
    };
  },
};
