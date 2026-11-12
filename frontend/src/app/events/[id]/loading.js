import React from "react";

export default function TournamentDetailLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-16 animate-pulse">
        <div className="w-32 h-4 rounded bg-zinc-800 mb-8" />

        {/* Hero Card Skeleton */}
        <div className="h-72 rounded-3xl bg-zinc-900 border border-zinc-800 p-8 md:p-12 mb-12 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-24 h-6 rounded bg-zinc-800" />
            <div className="w-80 h-10 rounded-xl bg-zinc-800" />
            <div className="w-48 h-5 rounded bg-zinc-800/60" />
          </div>
          <div className="flex gap-4">
            <div className="w-32 h-10 rounded-xl bg-zinc-800" />
          </div>
        </div>

        {/* Fixtures Skeleton */}
        <div className="space-y-4">
          <div className="w-64 h-8 rounded bg-zinc-800 mb-4" />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 rounded-xl bg-zinc-900/60 border border-zinc-800 p-5 flex items-center justify-between"
            >
              <div className="w-24 h-4 rounded bg-zinc-800" />
              <div className="w-56 h-6 rounded bg-zinc-800" />
              <div className="w-28 h-4 rounded bg-zinc-800" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

