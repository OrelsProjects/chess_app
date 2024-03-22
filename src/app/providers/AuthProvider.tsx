/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../firebase.config";
import { selectAuth, setUser } from "../../lib/features/auth/authSlice";
import useAuth from "../../hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import User from "../../models/user";
import axios from "axios";
import { Loading } from "../../components/ui/loading";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { firebaseUserToUser } = useAuth();
  const { state, loading: loadingAuth } = useSelector(selectAuth);
  const loading = useRef(false);

  const setUserData = async (user: User | null) => {
    if (loading.current) return;
    loading.current = true;

    if (!user) {
      dispatch(setUser(null));
      return;
    }
    try {
      const { token, ...userWithoutToken } = user;
      const userFromDB = await axios.post<User>("api/user/confirm", {
        user: userWithoutToken,
      });
      dispatch(setUser(userFromDB.data));
    } catch (error) {
      console.error("Error setting user data", error);
      dispatch(setUser(null));
    } finally {
      loading.current = false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(firebaseUserToUser(user));
      } else {
        setUserData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    if (loadingAuth) return;
    if (state === "unauthenticated") {
      if (pathname !== "/login") {
        router.push("/login");
      }
    } else if (pathname === "/login" || pathname === "/") {
      router.push("/home");
    }
  }, [state, loadingAuth]);
  if (loadingAuth) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loading className="w-10 h-10" />
      </div>
    );
  }
  return <div>{children}</div>;
}
