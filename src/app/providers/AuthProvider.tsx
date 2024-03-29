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
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUserData(user);
      },
      (error: any) => {
        console.error("Error setting user data", error);
      },
      () => {
        console.log("Completed setting user data");
      }
    );

    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    if (loadingAuth) return;
    if (state === "authenticated" || state === "anonymous") {
      router.push("/home");
      return;
    }
    if (pathname !== "/login" && pathname !== "/register") {
      router.push("/login");
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
