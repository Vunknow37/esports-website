import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/app/Components/Navbar/Navbar";
import Footer from "@/app/Components/Footer";

export default async function TeamsPage() {
  let teams = [];

  try {
    teams = await prisma.team.findMany({
      orderBy: { name: "asc" },
      include: {
        captain: {
          select: {
            id: true,
            name: true,
            gamerTag: true,
          },
        },
        members: {
          select: {
            id: true,
            name: true,
            gamerTag: true,
            image: true,
          },
        },
        matchesAsA: {
          take: 1,
          include: { tournament: { select: { gameTitle: true } } },
        },
        matchesAsB: {
          take: 1,
          include: { tournament: { select: { gameTitle: true } } },
        },
      },
    });
  } catch (error) {
    // Database connection offline fallback
    teams = [];
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Official Rosters
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-lexend tracking-tight text-white">
            TEAMS & PLAYERS
          </h1>
          <p className="text-zinc-400 mt-2 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
            Meet the official rosters competing for IIT Roorkee in regional tournaments, collegiate circuits, and scrim leagues.
          </p>
        </div>

        {/* Teams Grid */}
        {teams.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <div className="mx-auto w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-lexend">
              No official team rosters listed yet
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Rosters are updated ahead of tournament qualifiers. Register a team under an active tournament to be featured!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teams.map((team) => {
              // Determine primary game
              const primaryGame =
                team.matchesAsA[0]?.tournament?.gameTitle ||
                team.matchesAsB[0]?.tournament?.gameTitle ||
                "Multi-Title";

              const captainTag =
                team.captain?.gamerTag || team.captain?.name || "Captain";

              return (
                <div
                  key={team.id}
                  className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 flex flex-col justify-between hover:border-purple-500/40 hover:bg-zinc-900/90 transition-all duration-300 shadow-xl"
                >
                  <div>
                    {/* Top Row: Game Badge & Member Count */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30">
                        {primaryGame}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">
                        {team.members.length} Active Players
                      </span>
                    </div>

                    {/* Team Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 via-zinc-800 to-zinc-900 border border-purple-500/30 flex items-center justify-center font-black font-lexend text-white text-lg shrink-0">
                        {team.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-extrabold text-lg sm:text-xl text-white font-lexend leading-tight truncate">
                          {team.name}
                        </h3>
                        <p className="text-xs text-zinc-400 truncate">
                          Captain: <span className="text-purple-400 font-semibold">@{captainTag}</span>
                        </p>
                      </div>
                    </div>

                    {/* Roster Members IGN List */}
                    <div className="mt-5 pt-4 border-t border-zinc-800/80">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-3">
                        Active In-Game Names (IGNs)
                      </h4>

                      {team.members.length === 0 ? (
                        <p className="text-xs text-zinc-500 italic">No members assigned yet</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {team.members.map((member) => (
                            <span
                              key={member.id}
                              className="px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-xs text-zinc-200 font-mono flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                              {member.gamerTag || member.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
                    <span>Collegiate Division</span>
                    <span className="text-purple-400 font-semibold">Ready for Scrims</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

