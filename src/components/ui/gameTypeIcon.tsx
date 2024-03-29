import React from "react";
import { GameType } from "../../models/chessEvent";
import Image from "next/image";

interface GameTypeIconProps {
  gameType: GameType;
}
const classNames: Record<GameType, string> = {
  bullet: "!w-6 !h-4",
  blitz: "!w-4 !h-5",
  rapid: "!w-4 !h-4",
  classical: "!w-5 !h-5",
};

export default function GameTypeIcon({ gameType }: GameTypeIconProps) {
  return (
    <Image
      src={`/${gameType}.png`}
      alt={gameType}
      fill
      className={`!relative ${classNames[gameType]}`}
    />
  );
}
