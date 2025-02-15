"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully");
      router.push("/");
    } catch (error: any) {
      toast.error("Failed to create account");
      console.error(error);
    }
  }

  async function handleGoogleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google");
      router.push("/");
    } catch (error: any) {
      toast.error("Google sign-in error");
      console.error(error);
    }
  }

  return (
    <div className="flex h-dvh w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-4 p-6 rounded-xl border bg-white shadow-sm">
        <h3 className="text-xl font-semibold text-center">Sign Up</h3>
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
          Sign up with Google
        </Button>
        <div className="relative mt-2 mb-2 flex items-center justify-center">
          <span className="absolute bg-white px-2 text-sm text-gray-500">
            or with Email
          </span>
          <div className="h-px w-full bg-gray-200" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full mt-2" type="submit">
            Sign Up
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}