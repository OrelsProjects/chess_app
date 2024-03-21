import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import chessEventsReducer from "./features/chessEvents/chessEventsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      chessEvents: chessEventsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
