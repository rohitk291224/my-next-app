"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import signinGraphic from "../assets/img/signin-graphic.png";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const success = await login(email, password);
      if (!success) {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#a03c50]"></div>
      </div>
    );
  }

  // Don't render login form if user is already logged in
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-[#f8eaea]">
      {/* Left Side - Illustration with ellipse background */}
      <div className="flex-1 relative flex flex-col items-start justify-start min-w-0 overflow-hidden">
        {/* Ellipse background */}
        <div
          className="absolute inset-0 -left-1/4 w-[140%] h-full bg-[#f8eaea] rounded-r-[60%] z-0"
          style={{ clipPath: "ellipse(80% 100% at 40% 50%)" }}
        ></div>
        {/* Logo */}
        <div className="absolute top0 left-0 bg-white text-black  px-8 py-6 font-medium tracking-widest text-xl -rotate-45 -translate-x-10 translate-y-5 z-20  border border-[#e5e5e5]">
          LOGO
        </div>
        {/* Illustration */}
        <div className="w-full h-full flex items-center justify-center z-10">
          <Image
            src={signinGraphic}
            alt="Sign In Illustration"
            width={400}
            height={400}
            className="max-w-[90%] h-auto object-contain"
            priority
          />
        </div>
      </div>
      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center min-w-0 bg-white">
        <div className="w-[350px] max-w-[90%]">
          <h1 className="font-bold text-3xl mb-2 text-center text-black">
            Welcome! Sign In
          </h1>
          <p className="text-neutral-500 mb-8 text-center">
            Please enter your User ID and Password to
            <br />
            access your account.
          </p>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-600 text-sm mb-2 text-center">
                {error}
              </div>
            )}
            <div className="mb-2">
              <div className="relative mb-5">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="User ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 pl-4 pr-11 rounded-lg placeholder-gray-400 border border-gray-300 focus:border-[#7a434b] focus:ring-[#7a434b] bg-white text-black"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  <User size={20} />
                </span>
              </div>
            </div>
            <div className="mb-2">
              <div className="relative mb-4">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 pl-4 pr-11 rounded-lg placeholder-gray-400 border border-gray-300 focus:border-[#7a434b] focus:ring-[#7a434b] bg-white text-black"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  <Lock />
                </span>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <Checkbox id="remember" className="mr-2 data-[state=checked]:bg-[#7a434b] data-[state=checked]:border-[#7a434b]" />
              <Label htmlFor="remember" className="text-neutral-500 flex-1">
                Remember me
              </Label>
              <a
                href="#"
                className="text-neutral-500 no-underline ml-auto hover:underline text-sm"
              >
                Forgot password?
              </a>
            </div>
            <Button type="submit" disabled={loading} className="bg-[#7a434b] hover:bg-[#a03c50] text-white font-semibold py-3 rounded-lg mt-2">
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="text-center mt-3">
            <a
              href="#"
              className="text-neutral-500 underline font-medium hover:text-[#7a434b] transition-colors text-sm"
            >
              Don't have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
