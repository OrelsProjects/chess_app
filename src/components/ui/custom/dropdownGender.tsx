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
import { Gender } from "../../../models/playerDetails";

export default function DropdownGender({
  value,
  onChange,
}: {
  value: Gender;
  onChange: (eventType: Gender) => void;
}) {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{value === "female" ? "נקבה" : "זכר"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            onChange(value as Gender);
          }}
        >
          <DropdownMenuRadioItem value="male">זכר</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="female">נקבה</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
