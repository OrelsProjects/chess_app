"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Icons } from "../../../components/ui/iconst";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  loginWithGoogle: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

export function UserAuthForm({
  className,
  loginWithGoogle,
  login,
  ...props
}: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      onSubmit({ username: values.email, password: values.password });
    },
  });

  const onSignUp = () => {
    router.push("/register");
  };

  async function onSubmit({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    setIsLoading(true);
    try {
      debugger;
      await login(username, password);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle the error, e.g., show a message to the user
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              אימייל
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <Input
              id="password"
              placeholder="סיסמא"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            התחבר עם אימייל
          </Button>
          <div className="flex flex-row justify-start items-center gap-1 text-priamry text-base">
            אין לך משתמש?
            <Button
              variant="link"
              type="button"
              disabled={isLoading}
              onClick={onSignUp}
              className="p-0"
            >
              הירשם
            </Button>
          </div>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">או</span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={loginWithGoogle}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mx-2 h-4 w-4" />
        )}{" "}
        גוגל
      </Button>
    </div>
  );
}
