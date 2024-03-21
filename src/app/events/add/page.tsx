"use client";

import React from "react";
import AddEventForm from "../../../components/forms/addEventForm";
import axios from "axios";
import toast from "react-hot-toast";
import { CreateChessEvent } from "../../../models/chessEvent";

export default function EventsAddPage() {
  const onSubmit = async (event: CreateChessEvent) => {
    const formData = new FormData();
    if (event.imageFile) {
      formData.append("file", event.imageFile);
    }
    formData.append("event", JSON.stringify(event));

    try {
      await toast.promise(
        axios.post("api/events", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Saving event...",
          success: () => {
            return "Event saved!";
          },
          error: "Failed to save event",
        }
      );
    } catch (e) {}
  };

  return (
    <div>
      <AddEventForm onSubmit={onSubmit} />
    </div>
  );
}
