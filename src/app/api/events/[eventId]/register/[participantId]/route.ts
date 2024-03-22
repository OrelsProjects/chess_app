import { NextRequest, NextResponse } from "next/server";
import { UnauthorizedError } from "../../../../../../models/errors/UnauthorizedError";
import { registerToEvent } from "../../../../../../_requests/event";
import { confirmUser } from "../../_utils";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { eventId: string; participantId: string } }
) {
  let responseBody: any = {};
  let status = 200;
  try {
    confirmUser(params.participantId, req);
    registerToEvent(params.eventId, params.participantId);
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      status = 401;
      responseBody = { error: "Unauthorized" };
    }
    console.error(err);
    status = 500;
    responseBody = { error: "Internal Server Error" };
  }
  return NextResponse.json({ ...responseBody }, { status });
}
