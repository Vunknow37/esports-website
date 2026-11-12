import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Hero() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 md:py-36 px-6 md:px-16 border-b border-zinc-800/80">
      {/* Atmospheric Background Art & Portal Image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <Image
          src="/assets/hero-portal.png"
          alt="Esports Portal Arena"
          priority
          fill
          className="object-cover object-right md:object-[right_center] opacity-65 md:opacity-80 scale-105 transition-transform duration-1000"
        />

        {/* Cinematic gradient overlays for contrast & seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 md:via-zinc-950/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/70" />

        {/* Ambient neon violet glow behind the diamond portal */}
        <div className="absolute top-1/2 right-12 md:right-32 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[130px]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-start justify-center">
        {/* Esports Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md shadow-lg shadow-purple-500/10">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          Season 2026 Live Arena
        </div>

        {/* Headlines */}
        <h2 className="font-extrabold text-2xl md:text-3xl text-zinc-300 tracking-wider uppercase font-lexend drop-shadow-md">
          {user ? `WELCOME BACK, ${user.name || "CHAMPION"}` : "IT'S"}
        </h2>
        <h1 className="font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none uppercase bg-gradient-to-r from-purple-300 via-pink-400 to-[#ec3661] bg-clip-text text-transparent font-lexend mt-2 mb-6 drop-shadow-2xl">
          PLAYTIME
        </h1>

        <p className="max-w-xl text-zinc-300/90 text-base md:text-lg mb-10 leading-relaxed font-sans backdrop-blur-sm">
          The official competitive collegiate gaming portal of IIT Roorkee. Compete in seasonal tournaments,
          scrim with elite rosters, and forge your legacy across Valorant, BGMI, and CS2.
        </p>

        {/* Auth-Aware CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          {user ? (
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl font-lexend font-bold text-sm tracking-wider uppercase text-white bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all shadow-xl shadow-purple-600/40 border border-purple-400/40 flex items-center gap-2"
            >
              <span>Go to Dashboard</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-8 py-4 rounded-xl font-lexend font-bold text-sm tracking-wider uppercase text-white bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all shadow-xl shadow-purple-600/40 border border-purple-400/40 flex items-center gap-2"
            >
              <span>Join Now</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}

          <Link
            href="/events"
            className="px-8 py-4 rounded-xl font-lexend font-bold text-sm tracking-wider uppercase text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 hover:text-white border border-zinc-700/80 transition-all active:scale-95 backdrop-blur-md"
          >
            View Events
          </Link>
        </div>
      </div>
    </section>
  );
}
