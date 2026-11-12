"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-2xl mb-6 shadow-xl shadow-red-500/10">
        ⚠️
      </div>

      <h1 className="text-3xl font-black font-lexend tracking-tight text-white mb-2">
        DISPATCH INTERRUPTED
      </h1>
      <p className="text-sm text-zinc-400 max-w-md mb-8 leading-relaxed">
        An unexpected error occurred while loading this page. Don&apos;t worry, your match data is safe.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl font-lexend font-bold text-xs uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all shadow-lg shadow-purple-600/30"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="px-6 py-3 rounded-xl font-lexend font-bold text-xs uppercase tracking-wider text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
