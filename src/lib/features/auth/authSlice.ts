import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import User from "../../../models/user";
import _ from "lodash";

export type AuthStateType = "anonymous" | "authenticated" | "unauthenticated";

export interface AuthState {
  user: User | null;
  isAdmin: boolean;
  state: AuthStateType;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  isAdmin: false,
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
      state.isAdmin = action.payload?.role === "admin";
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
