import { NextRequest, NextResponse } from "next/server";
import { fetchPlayer } from "../../_utils";
import PlayerDetails from "../../../../models/playerDetails";
import PlayerNumberNotFoundError from "../../../../models/errors/PlayerNotFoundError";

export async function GET(
  req: NextRequest,
  { params }: { params: { playerNumber: number } }
) {
  let statusCode = 200;
  let body: PlayerDetails | null = null;
  try {
    const player = await fetchPlayer(params.playerNumber);
    body = { ...player };
  } catch (error) {
    if (error instanceof PlayerNumberNotFoundError) {
      statusCode = 404;
    } else {
      statusCode = 500;
    }
    body = null;
  }
  return NextResponse.json({ ...body }, { status: statusCode });
}

// export async function POST(req: NextRequest) {}
