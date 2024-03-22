import { FirestoreDataConverter } from "firebase/firestore";
import { ChessEvenData } from "../../models/chessEvent";

export const chessEventConverter: FirestoreDataConverter<ChessEvenData> = {
  toFirestore(chessEvent: ChessEvenData): any {
    return chessEvent;
  },
  fromFirestore(snapshot, options): ChessEvenData {
    const data = snapshot.data(options);
    const { isDeleted, participants: participantsData, ...rest } = data;
    const participants = Object.values(participantsData ?? {}).map(
      (participant: any) => ({
        userId: participant.userId,
        eventId: participant.eventId,
      })
    );

    return {
      id: snapshot.id as string,
      name: data.name as string,
      date: data.date as string,
      location: data.location as string,
      description: data.description as string,
      image: data.image as string,
      participants,
      ...rest,
    };
  },
};
