import jwt from "jsonwebtoken";
import { getUser } from "../../../_requests/user";
import { NextResponse } from "next/server";
import { createEvent } from "../../../_requests/event";
import { ChessEvent } from "../../../models/event";

export async function POST(req: Request) {
  let responseBody: any = {};
  let status = 200;
  try {
    const body = await req.json();
    const event = body.event as ChessEvent;
    const userId = req.headers.get("X-User-Id") as string;
    const token = req.headers.get("Authorization") as string;
    const user = await getUser(userId, token);
    if (user.role !== "admin") {
      status = 401;
      responseBody = { error: "Unauthorized" };
    } else {
      responseBody = await createEvent(event);
    }
  } catch (err) {}
  return NextResponse.json({ ...responseBody }, { status });
}
