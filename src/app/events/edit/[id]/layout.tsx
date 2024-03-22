import React from "react";
import AdminProvider from "../../../providers/AdminProvider";

export default function AddLayout({ children }: { children: React.ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>;
}
