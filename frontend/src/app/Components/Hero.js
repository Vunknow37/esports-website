import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Hero() {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    session = null;
  }
  const user = session?.user;

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-16 sm:py-24 md:py-36 px-4 sm:px-8 md:px-16 border-b border-zinc-800/80">
      {/* Sleek esports ambient glow accents */}
      <div className="absolute top-0 right-10 -z-10 w-72 sm:w-96 md:w-[500px] h-72 sm:h-96 md:h-[500px] bg-purple-600/20 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-72 sm:w-96 md:w-[450px] h-72 sm:h-96 md:h-[450px] bg-[#ec3661]/15 rounded-full blur-[100px] md:blur-[130px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-start justify-center">
        {/* Esports Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6 shadow-lg shadow-purple-500/10">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          Season 2026 Live Arena
        </div>

        {/* Headlines */}
        <h2 className="font-extrabold text-xl sm:text-2xl md:text-3xl text-zinc-300 tracking-wider uppercase font-lexend">
          {user ? `WELCOME BACK, ${user.gamerTag || user.name || "CHAMPION"}` : "IT'S"}
        </h2>
        <h1 className="font-black text-4xl sm:text-6xl md:text-8xl tracking-tight leading-none uppercase bg-gradient-to-r from-purple-300 via-pink-400 to-[#ec3661] bg-clip-text text-transparent font-lexend mt-2 mb-4 sm:mb-6 drop-shadow-lg break-words">
          PLAYTIME
        </h1>

        <p className="max-w-xl text-zinc-300 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 leading-relaxed font-sans">
          The official competitive collegiate gaming portal of IIT Roorkee. Compete in seasonal tournaments,
          scrim with elite rosters, and forge your legacy across Valorant, BGMI, and CS2.
        </p>

        {/* Auth-Aware CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
          {user ? (
            <Link
              href="/dashboard"
              className="px-8 py-3.5 sm:py-4 rounded-xl font-lexend font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all shadow-xl shadow-purple-600/40 border border-purple-400/40 flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Go to Dashboard</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-8 py-3.5 sm:py-4 rounded-xl font-lexend font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all shadow-xl shadow-purple-600/40 border border-purple-400/40 flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Join Now</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}

          <Link
            href="/events"
            className="px-8 py-3.5 sm:py-4 rounded-xl font-lexend font-bold text-xs sm:text-sm tracking-wider uppercase text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 hover:text-white border border-zinc-700/80 transition-all active:scale-95 flex items-center justify-center min-h-[44px]"
          >
            View Events
          </Link>
        </div>
      </div>
    </section>
  );
}
