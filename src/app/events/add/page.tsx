"use client";

import React from "react";
import AddEventForm from "../../../components/forms/addEventForm";
import axios from "axios";
import toast from "react-hot-toast";
import { ChessEvent } from "../../../models/event";

export default function EventsAddPage() {
  const onSubmit = (event: ChessEvent) => {
    toast.promise(axios.post("api/events", event), {
      loading: "Saving event...",
      success: () => {
        return "Event saved!";
      },
      error: "Failed to save event",
    });
  };

  return (
    <div>
      <AddEventForm onSubmit={onSubmit} />
    </div>
  );
}
