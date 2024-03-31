import React from "react";
import { GameType } from "../../models/chessEvent";
import Image from "next/image";

interface GameTypeIconProps {
  gameType: GameType;
}
const classNames: Record<GameType, string> = {
  bullet: "!w-6 !h-4 md:!w-10 md:!h-6",
  blitz: "!w-4 !h-5 md:!w-8 md:!h-10",
  rapid: "!w-4 !h-4 md:!w-8 md:!h-8",
  classical: "!w-5 !h-5 md:!w-10 md:!h-10",
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
