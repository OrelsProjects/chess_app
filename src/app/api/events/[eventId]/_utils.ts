import { NextRequest } from "next/server";
import { UnauthorizedError } from "../../../../models/errors/UnauthorizedError";

export const confirmUser = (participantId: string, req: NextRequest) => {
  const userId = req.headers.get("X-User-Id");
  if (userId !== participantId) {
    throw new UnauthorizedError();
  }
};
