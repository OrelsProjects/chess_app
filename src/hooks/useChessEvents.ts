import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChessEvents } from "../lib/features/chessEvents/chessEventsSlice";
import { ChessEvent } from "../models/chessEvent";
import axios from "axios";
import { setEvents as setEventsAction } from "../lib/features/chessEvents/chessEventsSlice";

const useChessEvents = () => {
  const dispatch = useDispatch();
  const { events: eventsRedux } = useSelector(selectChessEvents);

  const [events, setEvents] = useState<ChessEvent[]>([]);

  useEffect(() => {
    setEvents(eventsRedux);
  }, [eventsRedux]);

  const loadChessEvents = async () => {
    const events = await axios.get<ChessEvent[]>("/api/events");
    dispatch(setEventsAction(events.data));
  };

  return { events, loadChessEvents };
};

export default useChessEvents;
