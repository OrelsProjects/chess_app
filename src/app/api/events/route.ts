import formidable from "formidable";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../../_requests/user";
import { createEvent } from "../../../_requests/event";
import { CreateChessEvent } from "../../../models/chessEvent";
import { uploadEventImage } from "../../../_requests/files";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  let responseBody: any = {};
  let status = 200;
  try {
    const formData = await req.formData();
    const eventImage: File = formData.get("file") as File;
    const event = JSON.parse(
      formData.get("event")?.toString() ?? "{}"
    ) as CreateChessEvent;
    const userId = req.headers.get("X-User-Id") as string;
    const token = req.headers.get("Authorization") as string;
    const user = await getUser(userId, token);
    if (user.role !== "admin") {
      status = 401;
      responseBody = { error: "Unauthorized" };
    } else {
      let imagePath: string | undefined = undefined;
      if (eventImage) {
        imagePath = await uploadEventImage(eventImage);
      }

      responseBody = await createEvent({
        ...event,
        image: imagePath,
      });
    }
  } catch (err) {
    status = 500;
    responseBody = { error: "Internal Server Error" };
  }
  return NextResponse.json({ ...responseBody }, { status });
}
