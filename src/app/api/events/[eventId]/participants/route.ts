import { NextRequest, NextResponse } from "next/server";
import { ChessEventParticipantData } from "../../../../../models/chessEventParticipant";
import { GetEventParticipants } from "../../../../../_requests/participant";

export async function GET(
  _: NextRequest,
  { params }: { params: { eventId: string } }
): Promise<NextResponse<ChessEventParticipantData[]>> {
  let responseBody: ChessEventParticipantData[] = [];
  let statusCode = 200;
  try {
    const participants = await GetEventParticipants(params.eventId);
    responseBody = participants;
  } catch (e) {
    console.error(e);
    statusCode = 500;
  }
  return NextResponse.json([...responseBody], { status: statusCode });
}
