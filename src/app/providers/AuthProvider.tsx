/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../../firebase.config";
import { selectAuth } from "../../lib/features/auth/authSlice";
import useAuth from "../../hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { Loading } from "../../components/ui/loading";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUserData } = useAuth();
  const { state, loading: loadingAuth } = useSelector(selectAuth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserData(user);
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
