"use client";

import React, { useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import Table from "../../components/table/table";
import useChessEvents from "../../hooks/useChessEvents";

export default function Page() {
  const router = useRouter();
  const { events } = useChessEvents();

  return (
    <div className="flex flex-col">
      <Button onClick={() => router.push("/events/add")}>הוסף אירוע</Button>
      <Table events={events} />
    </div>
  );
}
