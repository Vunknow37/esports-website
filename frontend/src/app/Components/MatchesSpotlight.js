import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function MatchesSpotlight() {
  let matches = [];

  try {
    matches = await prisma.match.findMany({
      take: 3,
      orderBy: { scheduledTime: "asc" },
      where: {
        tournament: {
          status: { in: ["UPCOMING", "ONGOING"] },
        },
      },
      include: {
        tournament: true,
        teamA: true,
        teamB: true,
      },
    });
  } catch (error) {
    // Database connection offline fallback
    matches = [];
  }

  return (
    <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            Live & Scheduled
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-lexend tracking-tight">
            MATCHES SPOTLIGHT
          </h2>
          <p className="text-zinc-400 mt-2 text-sm max-w-xl">
            Catch the most thrilling clashes, tournament brackets, and live showdowns.
          </p>
        </div>

        <Link
          href="/events"
          className="mt-4 md:mt-0 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
        >
          <span>All Match Schedules</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Matches Grid or Empty State */}
      {matches.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-12 text-center backdrop-blur-sm">
          <div className="mx-auto w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white font-lexend">
            No upcoming matches scheduled at the moment
          </h3>
          <p className="text-sm text-zinc-400 mt-1 max-w-md mx-auto">
            Our next tournament brackets are being configured. Check back shortly or register your team!
          </p>
          <div className="mt-6">
            <Link
              href="/events"
              className="inline-block px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase tracking-wider text-white transition-all"
            >
              Browse Tournaments
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => {
            const matchDate = new Date(match.scheduledTime);
            const isLive = match.tournament?.status === "ONGOING";

            return (
              <div
                key={match.id}
                className="group relative rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 flex flex-col justify-between hover:border-purple-500/50 hover:bg-zinc-900/90 transition-all duration-300 shadow-xl"
              >
                {/* Card Top: Game & Status Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-zinc-800 text-purple-300 border border-zinc-700">
                    {match.tournament?.gameTitle || "Esports"}
                  </span>

                  {isLive ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Live Now
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-400 font-medium">
                      {matchDate.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>

                {/* Card Center: Teams Duel */}
                <div className="py-4 my-auto">
                  <div className="flex items-center justify-between text-center gap-4">
                    {/* Team A */}
                    <div className="flex-1">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-purple-600/30 to-zinc-800 border border-purple-500/30 flex items-center justify-center font-bold font-lexend text-white text-lg">
                        {match.teamA?.name?.slice(0, 2).toUpperCase() || "TA"}
                      </div>
                      <p className="font-bold text-white text-sm truncate">
                        {match.teamA?.name || "Team A"}
                      </p>
                    </div>

                    {/* VS & Score */}
                    <div className="px-2 flex flex-col items-center">
                      <span className="font-lexend font-black text-xs text-zinc-500 tracking-widest uppercase">
                        VS
                      </span>
                      {match.score ? (
                        <span className="mt-1 font-mono font-bold text-sm text-[#ec3661] bg-black/40 px-2 py-0.5 rounded border border-zinc-800">
                          {match.score}
                        </span>
                      ) : null}
                    </div>

                    {/* Team B */}
                    <div className="flex-1">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[#ec3661]/30 to-zinc-800 border border-[#ec3661]/30 flex items-center justify-center font-bold font-lexend text-white text-lg">
                        {match.teamB?.name?.slice(0, 2).toUpperCase() || "TB"}
                      </div>
                      <p className="font-bold text-white text-sm truncate">
                        {match.teamB?.name || "Team B"}
                      </p>
                    </div>
                  </div>

                  <p className="text-center text-xs text-zinc-500 mt-4 truncate">
                    {match.tournament?.title || "Tournament Bracket"}
                  </p>
                </div>

                {/* Card Bottom: Watch Live CTA */}
                <div className="mt-6 pt-4 border-t border-zinc-800/80">
                  <Link
                    href="/media"
                    className="w-full py-2.5 px-4 rounded-xl font-lexend font-bold text-xs uppercase tracking-wider text-white bg-purple-600/20 hover:bg-purple-600 border border-purple-500/40 hover:border-purple-500 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-600/20"
                  >
                    <svg className="w-4 h-4 text-purple-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Watch Live</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

