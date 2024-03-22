import React, { useMemo } from "react";
import { ChessEvent } from "../../models/chessEvent";
import TableItem from "./tableItem";
import useChessEvents from "../../hooks/useChessEvents";
import { Loading } from "../ui/loading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectAuth } from "../../lib/features/auth/authSlice";

interface TableItemProps {
  events: ChessEvent[];
}

const Table: React.FC<TableItemProps> = ({ events }) => {
  const router = useRouter();
  const { isAdmin } = useSelector(selectAuth);
  const {
    loading,
    deleteEvent,
    registerToEvent,
    unregisterFromEvent,
    isRegisteredToEvent,
  } = useChessEvents();

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
              onEdit={handleOnEdit}
              onDelete={deleteEvent}
              onRegister={handleRegister}
              isRegistered={isRegisteredToEvent(event)}
              isAdmin={isAdmin}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
