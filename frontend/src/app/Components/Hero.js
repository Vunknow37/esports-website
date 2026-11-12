import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Hero() {
  const session = await getServerSession(options);
  const user = session?.user;

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20 md:py-32 px-6 md:px-16 border-b border-zinc-800/60">
      {/* Background glowing gradients & gaming accents */}
      <div className="absolute top-0 right-10 -z-10 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-[400px] h-[400px] bg-[#ec3661]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-start justify-center">
        {/* Esports Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          Season 2026 Live
        </div>

        {/* Headlines */}
        <h2 className="font-extrabold text-2xl md:text-3xl text-zinc-400 tracking-wider uppercase font-lexend">
          {user ? `WELCOME BACK, ${user.name || "CHAMPION"}` : "IT'S"}
        </h2>
        <h1 className="font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none uppercase bg-gradient-to-r from-purple-400 via-pink-400 to-[#ec3661] bg-clip-text text-transparent font-lexend mt-1 mb-6">
          PLAYTIME
        </h1>

        <p className="max-w-2xl text-zinc-400 text-base md:text-lg mb-10 leading-relaxed font-sans">
          The premier hub for competitive collegiate gaming. Compete in weekly tournaments,
          scrim with elite teams, and build your gaming legacy across Valorant, BGMI, and CS2.
        </p>

        {/* Auth-Aware CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          {user ? (
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl font-lexend font-bold text-sm tracking-wider uppercase text-white bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all shadow-lg shadow-purple-600/30 border border-purple-400/30 flex items-center gap-2"
            >
              <span>Go to Dashboard</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-8 py-4 rounded-xl font-lexend font-bold text-sm tracking-wider uppercase text-white bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all shadow-lg shadow-purple-600/30 border border-purple-400/30 flex items-center gap-2"
            >
              <span>Join Now</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}

          <Link
            href="/events"
            className="px-8 py-4 rounded-xl font-lexend font-bold text-sm tracking-wider uppercase text-zinc-200 bg-zinc-900/80 hover:bg-zinc-800 hover:text-white border border-zinc-700/70 transition-all active:scale-95"
          >
            View Events
          </Link>
        </div>
      </div>
    </section>
  );
}
