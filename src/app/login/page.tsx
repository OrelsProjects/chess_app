"use client";

import React from "react";
import { UserAuthForm } from "./_components/authForm";
import useAuth from "../../hooks/useAuth";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthenticationPage() {
  const router = useRouter();
  const { loginWithGoogle, logout, login, authState } = useAuth();

  const handleContinueRegistration = () => {
    router.push("/register");
  };

  return (
    <>
      {authState === "registration_required" ? (
        <div className="flex flex-col gap-4 justify-center items-center">
          <div>נראה שאתה באמצע הרשמה!</div>
          <div className="flex flex-col justify-center items-center">
            <Button onClick={handleContinueRegistration}>אמשיך בהרשמה</Button>
            <Button variant="link" onClick={logout} className="p-0 h-fit">
              זה לא המשתמש שלי
            </Button>
          </div>
        </div>
      ) : (
        <UserAuthForm login={login} loginWithGoogle={loginWithGoogle} />
      )}
    </>
  );
}
