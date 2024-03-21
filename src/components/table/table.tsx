import React from "react";
import { ChessEvent } from "../../models/chessEvent";
import TableItem from "./tableItem";

interface TableItemProps {
  events: ChessEvent[];
}

const Table: React.FC<TableItemProps> = ({ events }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div>אירועים</div>
        <div>פעולות</div>
      </div>
      <div>
        {events.map((event) => (
          <TableItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Table;
