import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../../_requests/user";
import {
  GetEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../../../_requests/event";
import {
  removeEventImage as deleteEventImage,
  uploadEventImage,
} from "../../../_requests/files";
import { UnauthorizedError } from "../../../models/errors/UnauthorizedError";
import { ChessEvenData } from "../../../models/chessEvent";

async function validateRequest(req: NextRequest) {
  const userId = req.headers.get("X-User-Id") as string;
  const token = req.headers.get("Authorization") as string;
  const user = await getUser(userId, token);
  if (user.role !== "admin") {
    throw new UnauthorizedError();
  }
}

async function getEventData(req: NextRequest): Promise<{
  event?: ChessEvenData;
  imageFile?: File;
}> {
  let event: ChessEvenData | undefined = undefined;
  let imageFile: File | undefined = undefined;
  try {
    const formData = await req.formData();
    imageFile = formData?.get("file") as File;
    event = JSON.parse(
      formData.get("event")?.toString() ?? "{}"
    ) as ChessEvenData;
  } catch (e) {
    const body = await req.json();
    event = body.event;
  }
  return { event, imageFile };
}

export async function POST(req: NextRequest) {
  let responseBody: any = {};
  let status = 200;
  try {
    await validateRequest(req);
    const eventData = await getEventData(req);
    let imagePath: string | undefined = undefined;
    if (!eventData.event) {
      throw new Error("No event data");
    }
    if (eventData.imageFile) {
      imagePath = await uploadEventImage(eventData.imageFile);
    }
    const { id, participants, ...eventDataNoId } = eventData.event;
    responseBody = await createEvent({
      ...eventDataNoId,
      image: imagePath,
    });
  } catch (err) {
    console.error(err);
    if (err instanceof UnauthorizedError) {
      status = 401;
    } else {
      status = 500;
      responseBody = { error: "Internal Server Error" };
    }
  }
  return NextResponse.json({ ...responseBody }, { status });
}

export async function GET(_: NextRequest) {
  try {
    const events = await GetEvents();
    return NextResponse.json([...events], { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  let responseBody: any = {};
  let status = 200;
  try {
    await validateRequest(req);

    const eventData = await getEventData(req);
    if (eventData && eventData.event) {
      let newImagePath = eventData.event?.image;
      if (eventData.imageFile) {
        newImagePath = await uploadEventImage(eventData.imageFile);
        await deleteEventImage(eventData.event?.image);
      }
      responseBody = await updateEvent({
        ...eventData.event,
        image: newImagePath,
      });
    } else {
      throw new Error("No event data");
    }
  } catch (err) {
    console.error(err);
    if (err instanceof UnauthorizedError) {
      status = 401;
    } else {
      status = 500;
      responseBody = { error: "Internal Server Error" };
    }
  }
  return NextResponse.json({ ...responseBody }, { status });
}

export async function DELETE(req: NextRequest) {
  let status = 200;
  try {
    await validateRequest(req);

    const eventData = await getEventData(req);
    if (!eventData.event) {
      throw new Error("No event data");
    }
    deleteEvent(eventData.event.id);
    // try {
    //   await deleteEventImage(eventData.event.image);
    // } catch (e) {
    //   console.error(e);
    // }
  } catch (err) {
    console.error(err);
    if (err instanceof UnauthorizedError) {
      status = 401;
    } else {
      status = 500;
    }
  }
  return NextResponse.json({}, { status });
}
