import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChessEvents } from "../lib/features/chessEvents/chessEventsSlice";
import {
  ChessEvenData as ChessEventData,
  CreateChessEvent,
  UpdateChessEvent,
} from "../models/chessEvent";
import axios from "axios";
import {
  setEvents as setEventsAction,
  deleteEvent as deleteEventAction,
  updateEvent as updateEventAction,
  addEvent as addEventAction,
  addParticipant as addParticipantAction,
  removeParticipant as removeParticipantAction,
} from "../lib/features/chessEvents/chessEventsSlice";
import { selectAuth } from "../lib/features/auth/authSlice";
import { ChessEventParticipant } from "../models/chessEventParticipant";

const useChessEvents = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const { events: eventsRedux } = useSelector(selectChessEvents);

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<ChessEventData[]>([]);

  useEffect(() => {
    setEvents(eventsRedux);
  }, [eventsRedux]);

  const isRegisteredToEvent = useCallback(
    (event: ChessEventData) => {
      return event.participants?.some(
        (participant) => participant.userId === user?.userId
      );
    },
    [user]
  );

  const getEvent = (id: string): ChessEventData | undefined => {
    return eventsRedux.find((event) => event.id === id);
  };

  const loadChessEvents = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const events = await axios.get<ChessEventData[]>("/api/events");
      dispatch(setEventsAction(events.data));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const unregisterFromEvent = async (event: ChessEventData) => {
    if (loading) return;
    await axios.delete(`/api/events/${event.id}/unregister/${user?.userId}`);
    dispatch(
      removeParticipantAction({ eventId: event.id, userId: user?.userId ?? "" })
    );
  };

  const registerToEvent = async (chessEvent: ChessEventData) => {
    if (loading) return;
    const eventParticipant: ChessEventParticipant = {
      eventId: chessEvent.id,
      userId: user?.userId ?? "",
    };
    await axios.patch(`/api/events/${chessEvent.id}/register/${user?.userId}`);
    dispatch(addParticipantAction(eventParticipant));
  };

  const deleteEvent = async (event: ChessEventData) => {
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

      const response = await axios.patch<ChessEventData>(
        "api/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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

      const newEvent = await axios.post<ChessEventData>(
        "api/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
    isRegisteredToEvent,
    getEvent,
    loadChessEvents,
    registerToEvent,
    deleteEvent,
    updateEvent,
    createEvent,
    unregisterFromEvent,
  };
};

export default useChessEvents;
