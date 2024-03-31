import PlayerDetails from "./playerDetails";
import User from "./user";

export interface ChessEventParticipant {
  userId: string;
  eventId: string;
}

export type ChessEventParticipantData = ChessEventParticipant &
  Pick<User, "displayName"> &
  Pick<
    PlayerDetails,
    | "firstName"
    | "lastName"
    | "ratingIsrael"
    | "playerNumber"
    | "title"
    | "gender"
  >;
