import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import _ from "lodash";
import { UserFullData } from "../../../models/types/userFullData";

export type AuthStateType =
  | "anonymous"
  | "authenticated"
  | "unauthenticated"
  | "registration_required";

export interface AuthState {
  user: UserFullData | null;
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
    setUser: (
      state,
      action: PayloadAction<(UserFullData & { state?: AuthStateType }) | null>
    ) => {
      state.loading = false;
      if (!action.payload) {
        state.user = null;
        state.state = "unauthenticated";
        return;
      }
      const { state: authState, ...user } = action.payload;
      if (user && !_.isEqual(state.user, user)) {
        state.user = user;
      }
      state.isAdmin = action.payload?.role === "admin";
      state.state = action.payload.state ?? "authenticated";
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
