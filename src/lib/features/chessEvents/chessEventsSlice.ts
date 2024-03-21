import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import User from "../../../models/user";
import { ChessEvent } from "../../../models/chessEvent";

interface ChessEventsState {
  events: ChessEvent[];
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
    setEvents: (state, action: PayloadAction<ChessEvent[]>) => {
      state.events = action.payload;
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      console.error(action.payload);
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setEvents, setError } = chessEventsSlice.actions;

export const selectChessEvents = (state: RootState): ChessEventsState =>
  state.chessEvents;

export default chessEventsSlice.reducer;
