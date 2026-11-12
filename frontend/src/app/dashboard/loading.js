import React from "react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-16 animate-pulse">
        {/* Topbar Skeleton */}
        <div className="flex justify-between items-center pb-6 mb-10 border-b border-zinc-800">
          <div>
            <div className="w-32 h-5 rounded-full bg-zinc-800 mb-2" />
            <div className="w-64 h-9 rounded-xl bg-zinc-800" />
          </div>
          <div className="w-36 h-10 rounded-xl bg-zinc-800" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="h-96 rounded-3xl bg-zinc-900 border border-zinc-800 p-8" />
          <div className="lg:col-span-2 space-y-8">
            <div className="h-56 rounded-3xl bg-zinc-900 border border-zinc-800 p-8" />
            <div className="h-56 rounded-3xl bg-zinc-900 border border-zinc-800 p-8" />
          </div>
        </div>
      </main>
    </div>
  );
}

