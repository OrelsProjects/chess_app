import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ChessEvenData, ChessEvent } from "../../../models/chessEvent";
import { ChessEventParticipant } from "../../../models/chessEventParticipant";

interface ChessEventsState {
  events: ChessEvenData[];
  loading: boolean;
  error: string | null;
}

const initialState: ChessEventsState = {
  events: [],
  loading: true,
  error: null,
};

const chessEventsSlice = createSlice({
  name: "chessEvents",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<ChessEvenData[]>) => {
      state.events = action.payload;
      state.loading = false;
    },
    addEvent: (state, action: PayloadAction<ChessEvenData>) => {
      state.events = [...state.events, action.payload];
      state.loading = false;
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
      state.loading = false;
    },
    updateEvent: (state, action: PayloadAction<ChessEvenData>) => {
      state.events = state.events.map((event) =>
        event.id === action.payload.id ? { ...event, ...action.payload } : event
      );
      state.loading = false;
    },
    addParticipant: (state, action: PayloadAction<ChessEventParticipant>) => {
      const event = state.events.find(
        (event) => event.id === action.payload.eventId
      );
      if (event) {
        event.participants = [...(event.participants ?? []), action.payload];
      }
      state.loading = false;
    },
    removeParticipant: (
      state,
      action: PayloadAction<ChessEventParticipant>
    ) => {
      const event = state.events.find(
        (event) => event.id === action.payload.eventId
      );
      if (event) {
        event.participants = event.participants?.filter(
          (participant) => participant.userId !== action.payload.userId
        );
      }
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      console.error(action.payload);
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setEvents,
  deleteEvent,
  updateEvent,
  addEvent,
  addParticipant,
  removeParticipant,
  setError,
} = chessEventsSlice.actions;

export const selectChessEvents = (state: RootState): ChessEventsState =>
  state.chessEvents;

export default chessEventsSlice.reducer;
