"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div onClick={() => signIn("google", { redirectTo: "/" })}>
      Sign In
    </div>
  );
}
