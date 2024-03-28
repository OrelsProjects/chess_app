export type Gender = "male" | "female";

export default interface PlayerDetails {
  ratingIsrael: number;
  firstName: string;
  lastName: string;
  playerNumber: string;
  ratingFide?: number;
  ratingFideRapid?: string;
  ratingFideBlitz?: string;
  yearOfBirth?: string;
  clubName?: string;
  fidePlayerId?: string;
  profileExpirationDate?: Date;
  fullName?: string;
  title?: string;
  gender: Gender;
}
