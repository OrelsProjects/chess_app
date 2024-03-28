import { FirestoreDataConverter } from "firebase/firestore";
import { UserFullData } from "../../models/types/userFullData";
import { UserRole } from "../../models/user";
import { Gender } from "../../models/playerDetails";

export const userConvereter: FirestoreDataConverter<UserFullData> = {
  toFirestore(chessEvent: UserFullData): any {
    return chessEvent;
  },
  fromFirestore(snapshot, options): UserFullData {
    const data = snapshot.data(options);
    return {
      userId: snapshot.id as string,
      displayName: data.displayName as string,
      email: data.email as string,
      photoURL: data.photoURL as string,
      birthDate: data.birthDate as string,
      role: data.role as UserRole,
      token: data.token as string,
      playerDetails: data.playerDetails
        ? {
            ratingIsrael: data.playerDetails?.ratingIsrael as number,
            firstName: data.playerDetails?.firstName as string,
            lastName: data.playerDetails?.lastName as string,
            playerNumber: data.playerDetails?.playerNumber as string,
            ratingFide: data.playerDetails?.ratingFide as number,
            ratingFideRapid: data.playerDetails?.ratingFideRapid as string,
            ratingFideBlitz: data.playerDetails?.ratingFideBlitz as string,
            yearOfBirth: data.playerDetails?.yearOfBirth as string,
            clubName: data.playerDetails?.clubName as string,
            fidePlayerId: data.playerDetails?.fidePlayerId as string,
            profileExpirationDate: data.playerDetails
              ?.profileExpirationDate as Date,
            fullName: data.playerDetails?.fullName as string,
            title: data.playerDetails?.title as string,
            gender: data.playerDetails?.gender as Gender,
          }
        : undefined,
    };
  },
};
