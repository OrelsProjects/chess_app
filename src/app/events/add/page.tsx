"use client";

import React from "react";
import EventForm from "../../../components/forms/EventForm";
import toast from "react-hot-toast";
import { CreateChessEvent } from "../../../models/chessEvent";
import useChessEvents from "../../../hooks/useChessEvents";
import { useRouter } from "next/navigation";

export default function EventsAddPage() {
  const router = useRouter();
  const { createEvent } = useChessEvents();

  const onSubmit = async (event: CreateChessEvent) => {
    try {
      await toast.promise(createEvent(event), {
        loading: "שומר אירוע...",
        success: "האירוע נשמר בהצלחה",
        error: "אירעה שגיאה בעת שמירת האירוע",
      });
      router.back();
    } catch (e) {}
  };

  return (
    <div>
      <EventForm onSubmit={onSubmit} />
    </div>
  );
}
