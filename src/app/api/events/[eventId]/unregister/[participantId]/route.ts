import { NextRequest, NextResponse } from "next/server";
import { unregisterFromEvent } from "../../../../../../_requests/event";
import { UnauthorizedError } from "../../../../../../models/errors/UnauthorizedError";
import { confirmUser } from "../../_utils";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { participantId: string; eventId: string } }
) {
  let responseBody: any = {};
  let status = 200;
  try {
    confirmUser(params.participantId, req);
    unregisterFromEvent(params.eventId, params.participantId);
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
