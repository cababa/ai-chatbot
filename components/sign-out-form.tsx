"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export function SignOutForm() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Optionally redirect user or clear cookies
      // e.g., window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}