/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import EventForm from "../../../../components/forms/EventForm";
import toast from "react-hot-toast";
import { ChessEvent, UpdateChessEvent } from "../../../../models/chessEvent";
import useChessEvents from "../../../../hooks/useChessEvents";
import { useRouter } from "next/navigation";

export default function EventsAddPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { updateEvent, getEvent } = useChessEvents();
  const [chessEvent, setChessEvent] = React.useState<ChessEvent | undefined>(
    undefined
  );

  useEffect(() => {
    const event = getEvent(params.id);
    setChessEvent(event);
  }, [params.id]);

  const onSubmit = async (event: UpdateChessEvent) => {
    try {
      await toast.promise(updateEvent(event), {
        loading: "שומר אירוע...",
        success: () => {
          router.back();
          return "האירוע נשמר בהצלחה";
        },
        error: "שגיאה בשמירת האירוע",
      });
    } catch (e) {}
  };

  return (
    <div>
      <EventForm onSubmitUpdate={onSubmit} event={chessEvent} />
    </div>
  );
}
