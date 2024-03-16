import { NextRequest, NextResponse } from "next/server";
import { upsertUser } from "../../../../_requests/user";
import User from "../../../../models/user";

export async function POST(req: NextRequest) {
  let statusCode = 400;
  let responseBody: User | null = null;
  try {
    const body = await req.json();
    const { user } = body;
    const confirmedUser = await upsertUser(user);
    statusCode = 200;
    responseBody = { ...confirmedUser };
  } catch (error) {
    console.error("Error confirming user", error);
  }

  return NextResponse.json({ ...responseBody }, { status: statusCode });
}
