"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSignIn = async (provider) => {
    try {
      setLoadingProvider(provider);
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error(`Sign in with ${provider} failed:`, error);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 overflow-hidden bg-zinc-950">
      {/* Subtle gaming background glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#ec3661]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Player Access
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-lexend">
            WELCOME BACK
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            Sign in to access your teams, scrims, and tournament brackets.
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3.5 sm:space-y-4">
          {/* Discord Button */}
          <button
            type="button"
            disabled={loadingProvider !== null}
            onClick={() => handleSignIn("discord")}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl font-medium text-white bg-[#5865F2] hover:bg-[#4752c4] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#5865f2]/20 disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span>
              {loadingProvider === "discord"
                ? "Connecting to Discord..."
                : "Sign in with Discord"}
            </span>
          </button>

          {/* Google Button */}
          <button
            type="button"
            disabled={loadingProvider !== null}
            onClick={() => handleSignIn("google")}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl font-medium text-zinc-100 bg-zinc-800/80 hover:bg-zinc-800 active:scale-[0.99] border border-zinc-700/60 transition-all duration-200 shadow-md hover:border-zinc-600 disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.8C6.5 7.1 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.9c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.1L1.9 16.6C3.7 20.3 7.5 23.5 12 23.5z"
              />
            </svg>
            <span>
              {loadingProvider === "google"
                ? "Connecting to Google..."
                : "Sign in with Google"}
            </span>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-zinc-800/80 text-center">
          <p className="text-xs text-zinc-500">
            By signing in, you agree to our Tournament Rules and Code of Conduct.
          </p>
          <div className="mt-4">
            <Link
              href="/"
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center min-h-[44px] py-2"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
