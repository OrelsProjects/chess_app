import PlayerDetails from "../playerDetails";
import User from "../user";

export type UserFullData = User & {
  playerDetails?: PlayerDetails;
};
