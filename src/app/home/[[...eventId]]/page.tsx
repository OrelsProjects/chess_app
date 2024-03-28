"use client";

import React, { useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import Table from "../../../components/table/table";
import useChessEvents from "../../../hooks/useChessEvents";
import useAuth from "../../../hooks/useAuth";

export default function Page({ params }: { params: { eventId: string } }) {
  const router = useRouter();
  const { logout } = useAuth();
  const { events } = useChessEvents();
  const [eventIdToShow, setEventIdToShow] = React.useState<string | null>(null);
  useEffect(() => {
    if (params.eventId && params.eventId[0]) {
      setEventIdToShow(params.eventId[0]);
    }
  }, [params.eventId]);
  return (
    <div className="flex flex-col">
      <Button onClick={() => router.push("/events/add")}>הוסף אירוע</Button>
      <Table events={events} showEventId={eventIdToShow} />
      <div className="text-red-500" onClick={logout}>
        התנתק
      </div>
    </div>
  );
}
