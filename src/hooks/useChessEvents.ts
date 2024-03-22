import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChessEvents } from "../lib/features/chessEvents/chessEventsSlice";
import {
  ChessEvent,
  CreateChessEvent,
  UpdateChessEvent,
} from "../models/chessEvent";
import axios from "axios";
import {
  setEvents as setEventsAction,
  deleteEvent as deleteEventAction,
  updateEvent as updateEventAction,
  addEvent as addEventAction,
} from "../lib/features/chessEvents/chessEventsSlice";

const useChessEvents = () => {
  const dispatch = useDispatch();
  const { events: eventsRedux } = useSelector(selectChessEvents);

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<ChessEvent[]>([]);

  useEffect(() => {
    setEvents(eventsRedux);
  }, [eventsRedux]);

  const getEvent = (id: string): ChessEvent | undefined => {
    return eventsRedux.find((event) => event.id === id);
  };

  const loadChessEvents = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const events = await axios.get<ChessEvent[]>("/api/events");
      dispatch(setEventsAction(events.data));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (event: ChessEvent) => {
    if (loading) return;
    setLoading(true);

    try {
      await axios.delete(`/api/events/`, {
        data: { event },
      });
      dispatch(deleteEventAction(event.id));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (updateEvent: UpdateChessEvent) => {
    if (loading) return;
    setLoading(true);

    try {
      const { imageFile, ...event } = updateEvent;
      const formData = new FormData();
      if (imageFile) {
        formData.append("file", imageFile);
      }
      formData.append("event", JSON.stringify(event));

      const response = await axios.patch<ChessEvent>("api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(updateEventAction(response.data));
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (createEvent: CreateChessEvent) => {
    if (loading) return;
    setLoading(true);

    try {
      const { imageFile, ...event } = createEvent;
      const formData = new FormData();
      if (imageFile) {
        formData.append("file", imageFile);
      }
      formData.append("event", JSON.stringify(event));

      const newEvent = await axios.post<ChessEvent>("api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(addEventAction(newEvent.data));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    getEvent,
    loadChessEvents,
    deleteEvent,
    updateEvent,
    createEvent,
  };
};

export default useChessEvents;
