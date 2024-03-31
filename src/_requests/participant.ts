import { setDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import { ChessEvenData } from "../models/chessEvent";
import { validateEventExists, getEventDoc, usersCol } from "./common";
import User from "../models/user";
import { userConvereter } from "./converters/UserConverter";
import { UserFullData } from "../models/types/userFullData";
import {
  ChessEventParticipant,
  ChessEventParticipantData,
} from "../models/chessEventParticipant";
import { Gender } from "../models/playerDetails";

export const updateEvent = async (
  event: ChessEvenData
): Promise<ChessEvenData> => {
  validateEventExists(event.id);
  await setDoc(getEventDoc(event.id), event, { merge: true });
  return event;
};

export const GetEventParticipants = async (
  eventId: string
): Promise<ChessEventParticipantData[]> => {
  const eventDoc = getEventDoc(eventId);
  const event: ChessEvenData | undefined = (await getDoc(eventDoc)).data();
  const participants = event?.participants;
  const participantsDataQuery = query(
    usersCol,
    where(
      "userId",
      "in",
      participants?.map((p) => p.userId)
    )
  ).withConverter(userConvereter);
  const participantsData: UserFullData[] | undefined = (
    await getDocs(participantsDataQuery)
  ).docs.map((doc) => doc.data());

  const chessEventParticipants: ChessEventParticipantData[] =
    participantsData.map((participant) => ({
      userId: participant.userId,
      eventId: eventId,
      displayName: participant.displayName,
      firstName: participant.playerDetails?.firstName ?? "",
      lastName: participant.playerDetails?.lastName ?? "",
      ratingIsrael: participant.playerDetails?.ratingIsrael ?? 1199,
      playerNumber: participant.playerDetails?.playerNumber ?? "-1",
      title: participant.playerDetails?.title ?? "",
      gender: participant.playerDetails?.gender as Gender,
    }));
  return chessEventParticipants;
};
