"use client";

import React from "react";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <Button onClick={() => router.push("/events/add")}>הוסף אירוע</Button>
    </div>
  );
}
