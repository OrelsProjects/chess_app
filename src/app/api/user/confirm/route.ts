import { NextRequest, NextResponse } from "next/server";
import { getUser, upsertUser } from "../../../../_requests/user";
import UserNotFound from "../../../../models/errors/UserNotFoundError";
import { UserFullData } from "../../../../models/types/userFullData";
import { AuthStateType } from "../../../../lib/features/auth/authSlice";

export async function POST(req: NextRequest) {
  let statusCode = 400;
  let responseBody:
    | ({ user: UserFullData } & { state?: AuthStateType })
    | null = null;
  try {
    const body = await req.json();
    const { user } = body as { user: UserFullData };
    let confirmedUser = await getUser(user.userId, user.token);
    if(!confirmedUser) {
      confirmedUser = await upsertUser(user);
    }
    responseBody = {
      user: { ...confirmedUser },
    };
    if (!confirmedUser) {
      throw new UserNotFound();
    } else if (!confirmedUser.playerDetails) {
      responseBody = { ...responseBody, state: "registration_required" };
    }
    statusCode = 200;
  } catch (error: any) {
    statusCode = error.statusCode;
    console.error("Error confirming user", error);
  }

  return NextResponse.json({ ...responseBody }, { status: statusCode });
}
