/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../lib/features/auth/authSlice";
import useChessEvents from "../../hooks/useChessEvents";

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector(selectAuth);
  const { loadChessEvents } = useChessEvents();

  useEffect(() => {
    if (user) {
      loadChessEvents();
    }
  }, [user]);

  return <>{children}</>;
};

export default DataProvider;
