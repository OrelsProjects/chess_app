/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../lib/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function AdminProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useSelector(selectAuth);

  const isAdmin = useMemo(() => user?.role === "admin", [user]);

  useEffect(() => {
    if (!isAdmin && !loading) {
      router.push("/home");
    }
  }, [user, loading]);

  return <div>{isAdmin && children}</div>;
}
