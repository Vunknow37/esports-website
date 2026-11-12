import React from "react";

export default function EventsLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-16 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-12">
          <div className="w-36 h-6 rounded-full bg-zinc-800 mb-4" />
          <div className="w-64 h-10 rounded-xl bg-zinc-800 mb-3" />
          <div className="w-96 h-4 rounded bg-zinc-800/80" />
        </div>

        {/* Section Skeleton */}
        <div className="mb-12">
          <div className="w-48 h-8 rounded bg-zinc-800 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-60 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between mb-4">
                    <div className="w-20 h-5 rounded bg-zinc-800" />
                    <div className="w-16 h-5 rounded-full bg-zinc-800" />
                  </div>
                  <div className="w-44 h-7 rounded bg-zinc-800 mb-3" />
                  <div className="w-32 h-4 rounded bg-zinc-800/60" />
                </div>
                <div className="w-full h-8 rounded bg-zinc-800/40" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

