"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EventType, eventTypeToName } from "../../../models/chessEvent";

export default function DropdownEventType({
  value,
  onChange,
}: {
  value: EventType;
  onChange: (eventType: EventType) => void;
}) {
  console.log(value);
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {eventTypeToName(value) ?? "סוג משחק"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>סוג משחק</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            onChange(value as EventType);
          }}
        >
          <DropdownMenuRadioItem value="bullet">
            {eventTypeToName("bullet")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="blitz">
            {eventTypeToName("blitz")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="rapid">
            {eventTypeToName("rapid")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="classical">
            {eventTypeToName("classical")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
