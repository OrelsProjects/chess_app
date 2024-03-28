import { NextRequest, NextResponse } from "next/server";
import PlayerDetails from "../../../models/playerDetails";
import { upsertUserPlayerDetails } from "../../../_requests/user";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const headers = req.headers;
    const userId = headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found" },
        { status: 400 }
      );
    }
    const player = body as PlayerDetails;
    await upsertUserPlayerDetails(userId, player);
    return NextResponse.json({ ...player }, { status: 200 });
  } catch (e: any) {}
}
