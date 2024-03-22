import React from "react";
import { ChessEvent } from "../../models/chessEvent";
import TableItem from "./tableItem";
import useChessEvents from "../../hooks/useChessEvents";
import { Loading } from "../ui/loading";
import { useRouter } from "next/navigation";

interface TableItemProps {
  events: ChessEvent[];
}

const Table: React.FC<TableItemProps> = ({ events }) => {
  const router = useRouter();
  const { loading, deleteEvent } = useChessEvents();

  const handleOnEdit = (event: ChessEvent) => {
    router.push(`/events/edit/${event.id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div>אירועים</div>
        <div>פעולות</div>
      </div>
      <div className="flex flex-col overflow-auto gap-3">
        {loading ? (
          <Loading />
        ) : (
          events.map((event) => (
            <TableItem
              key={`chess-event-in-table-${event.id}`}
              event={event}
              onDelete={deleteEvent}
              onEdit={handleOnEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
