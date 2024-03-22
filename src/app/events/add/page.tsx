"use client";

import React from "react";
import EventForm from "../../../components/forms/EventForm";
import toast from "react-hot-toast";
import { CreateChessEvent } from "../../../models/chessEvent";
import useChessEvents from "../../../hooks/useChessEvents";

export default function EventsAddPage() {
  const { createEvent } = useChessEvents();

  const onSubmit = async (event: CreateChessEvent) => {
    try {
      await toast.promise(createEvent(event), {
        loading: "Saving event...",
        success: () => {
          return "Event saved!";
        },
        error: "Failed to save event",
      });
    } catch (e) {}
  };

  return (
    <div>
      <EventForm onSubmit={onSubmit} />
    </div>
  );
}
