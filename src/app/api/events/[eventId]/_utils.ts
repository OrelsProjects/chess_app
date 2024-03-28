import { NextRequest } from "next/server";
import { UnauthorizedError } from "../../../../models/errors/UnauthorizedError";

export const confirmUser = (participantId: string, req: NextRequest) => {
  const userId = req.headers.get("x-user-id");
  if (userId !== participantId) {
    throw new UnauthorizedError();
  }
};
