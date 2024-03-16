import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import User from "../../../models/user";
import _ from "lodash";

export type AuthStateType = "anonymous" | "authenticated" | "unauthenticated";

interface AuthState {
  user: User | null;
  state: AuthStateType;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  state: "unauthenticated",
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      if (
        (_.isEqual(state.user, action.payload) &&
          state.state === "authenticated") ||
        state.state === "anonymous"
      ) {
        state.loading = false;
        return;
      }
      state.user = action.payload;
      state.loading = false;
      state.state = action.payload ? "authenticated" : "unauthenticated";
    },
    setError: (state, action: PayloadAction<string | null>) => {
      console.error(action.payload);
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, setError } = authSlice.actions;

export const selectAuth = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
