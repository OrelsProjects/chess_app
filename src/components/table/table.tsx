import React, { useMemo } from "react";
import { ChessEvent } from "../../models/chessEvent";
import TableItem from "./tableItem";
import useChessEvents from "../../hooks/useChessEvents";
import Loading from "../ui/loading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectAuth } from "../../lib/features/auth/authSlice";

interface TableItemProps {
  events: ChessEvent[];
  showEventId?: string | null;
}

const Table: React.FC<TableItemProps> = ({ events, showEventId }) => {
  const router = useRouter();
  const { isAdmin } = useSelector(selectAuth);
  const { loading, registerToEvent, unregisterFromEvent, isRegisteredToEvent } =
    useChessEvents();

  const handleOnEdit = (event: ChessEvent) => {
    router.push(`/events/edit/${event.id}`);
  };

  const handleRegister = (event: ChessEvent) => {
    const registrationPromise = isRegisteredToEvent(event)
      ? unregisterFromEvent(event)
      : registerToEvent(event);
    const loadingMessage = isRegisteredToEvent(event)
      ? "מבצע ביטול רישום"
      : "מבצע רישום";
    const successMessage = isRegisteredToEvent(event)
      ? "ביטול רישום בוצע בהצלחה"
      : "נרשמת בהצלחה";
    const errorMessage = isRegisteredToEvent(event)
      ? "אירעה שגיאה בעת ביטול הרשמה"
      : "אירעה שגיאה בעת הרשמה";

    toast.promise(registrationPromise, {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col overflow-auto gap-3">
        {loading ? (
          <Loading />
        ) : (
          events.map((event) => (
            <TableItem
              key={`chess-event-in-table-${event.id}`}
              event={event}
              onEdit={handleOnEdit}
              onRegister={handleRegister}
              isAdmin={isAdmin}
              show={showEventId === event.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
