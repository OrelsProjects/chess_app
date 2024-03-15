"use client";

import React from "react";
import { Metadata } from "next";
import { UserAuthForm } from "./_components/authForm";
import useAuth from "../../../hooks/useAuth";


export default function AuthenticationPage() {
  const { user, error, loginWithGoogle, logout, login } = useAuth();
  return (
    <>
      <UserAuthForm login={login} loginWithGoogle={loginWithGoogle} />
      <div>{user && JSON.stringify(user)}</div>
      <div>{error}</div>
    </>
  );
}
