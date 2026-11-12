import React from "react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6">
      <div className="relative flex items-center justify-center">
        {/* Animated Glow Halo */}
        <div className="w-20 h-20 rounded-full bg-purple-600/30 animate-ping absolute" />
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-purple-500/50 flex items-center justify-center shadow-xl shadow-purple-600/20 relative z-10 animate-bounce">
          <span className="font-lexend font-black text-xl text-purple-400">⚡</span>
        </div>
      </div>
      <p className="mt-8 font-lexend font-bold text-xs uppercase tracking-widest text-zinc-400 animate-pulse">
        CONNECTING TO TOURNAMENT ARENA...
      </p>
    </div>
  );
}

