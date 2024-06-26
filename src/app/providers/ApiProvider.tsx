"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../lib/features/auth/authSlice";

const APIProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector(selectAuth);

  useEffect(() => {
    if (user) {
      axios.defaults.headers.common["Authorization"] = user.token;
      axios.defaults.headers.common["x-user-id"] = user.userId;
      axios.defaults.baseURL = window.location.origin;
    }
    axios.defaults.baseURL = window.location.origin;
  }, [user]);

  return <>{children}</>;
};

export default APIProvider;
