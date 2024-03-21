import React from "react";
import { ChessEvent } from "../../models/chessEvent";
import Image from "next/image";

interface TableItemProps {
  event: ChessEvent;
}

const TableItem: React.FC<TableItemProps> = ({ event }) => {
  return (
    <div className="flex gap-4 items-center">
      <div>
        <Image
          src={event.image ?? ""}
          alt={event.name}
          width={50}
          height={50}
          className="rounded-lg"
        />
      </div>
      <div>
        <div>{event.name}</div>
        <div>{event.date}</div>
      </div>
    </div>
  );
};

export default TableItem;
