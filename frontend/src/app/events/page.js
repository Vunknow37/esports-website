import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Navbar from "@/app/Components/Navbar/Navbar";
import Footer from "@/app/Components/Footer";

export default async function EventsPage() {
  let tournaments = [];

  try {
    tournaments = await prisma.tournament.findMany({
      orderBy: { startDate: "asc" },
      include: {
        matches: true,
      },
    });
  } catch (error) {
    console.error("Error fetching tournaments in EventsPage:", error.message);
    tournaments = [];
  }

  // Split into categories
  const activeTournaments = tournaments.filter(
    (t) => t.status === "UPCOMING" || t.status === "ONGOING"
  );
  const completedTournaments = tournaments.filter(
    (t) => t.status === "COMPLETED"
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-16">
        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Tournaments & Qualifiers
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-lexend tracking-tight text-white">
            COMPETITIVE EVENTS
          </h1>
          <p className="text-zinc-400 mt-2 text-sm md:text-base max-w-2xl">
            Explore active collegiate tournaments, register your rosters, or review past championship results.
          </p>
        </div>

        {/* Section 1: Upcoming & Ongoing */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <h2 className="text-2xl font-black font-lexend text-white tracking-wide">
              UPCOMING & ONGOING TOURNAMENTS
            </h2>
            <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">
              {activeTournaments.length} Active
            </span>
          </div>

          {activeTournaments.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-12 text-center">
              <p className="text-sm text-zinc-400">
                No active tournaments currently open for registration. Stay tuned for the upcoming season!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          )}
        </section>

        {/* Section 2: Completed Tournaments */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <h2 className="text-2xl font-black font-lexend text-white tracking-wide">
              COMPLETED CHAMPIONSHIPS
            </h2>
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
              {completedTournaments.length} Concluded
            </span>
          </div>

          {completedTournaments.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-10 text-center">
              <p className="text-sm text-zinc-500">
                Past tournament archives will appear here once events conclude.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

function TournamentCard({ tournament }) {
  const startDate = new Date(tournament.startDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const endDate = new Date(tournament.endDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isOngoing = tournament.status === "ONGOING";
  const isUpcoming = tournament.status === "UPCOMING";

  return (
    <Link
      href={`/events/${tournament.id}`}
      className="group rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 flex flex-col justify-between hover:border-purple-500/50 hover:bg-zinc-900/90 transition-all duration-300 shadow-xl"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-zinc-800 text-purple-300 border border-zinc-700">
            {tournament.gameTitle}
          </span>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${
              isOngoing
                ? "bg-red-500/20 text-red-400 border-red-500/30"
                : isUpcoming
                ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                : "bg-zinc-800 text-zinc-400 border-zinc-700"
            }`}
          >
            {tournament.status}
          </span>
        </div>

        <h3 className="text-xl font-bold font-lexend text-white group-hover:text-purple-300 transition-colors mb-2">
          {tournament.title}
        </h3>

        <p className="text-xs text-zinc-400 mb-4">
          Format: <span className="text-zinc-300 font-semibold">{tournament.format}</span>
        </p>
      </div>

      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
        <span>{startDate} — {endDate}</span>
        <span className="font-bold text-purple-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          View Brackets →
        </span>
      </div>
    </Link>
  );
}

