import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Navbar from "@/app/Components/Navbar/Navbar";
import Footer from "@/app/Components/Footer";
import RegisterTeamButton from "./RegisterTeamButton";

export default async function TournamentDetailPage({ params }) {
  const { id } = params;

  let tournament = null;

  try {
    tournament = await prisma.tournament.findUnique({
      where: { id },
      include: {
        matches: {
          orderBy: { scheduledTime: "asc" },
          include: {
            teamA: true,
            teamB: true,
          },
        },
      },
    });
  } catch (error) {
    // Database connection offline fallback
  }

  // Graceful fallback for mock preview if database is not seeded yet
  if (!tournament) {
    if (id.startsWith("mock-")) {
      tournament = {
        id,
        title: "IITR Inter-Hostel Invitational 2026",
        gameTitle: "Valorant",
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 86400000),
        format: "Double Elimination (5v5)",
        status: "UPCOMING",
        matches: [],
      };
    } else {
      notFound();
    }
  }

  const startDate = new Date(tournament.startDate).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const endDate = new Date(tournament.endDate).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-16">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/events"
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1"
          >
            ← Back to All Tournaments
          </Link>
        </div>

        {/* Hero Banner Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-8 md:p-12 mb-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  {tournament.gameTitle}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    tournament.status === "ONGOING"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : tournament.status === "UPCOMING"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {tournament.status}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black font-lexend tracking-tight text-white">
                {tournament.title}
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 text-xs">
                <div>
                  <span className="block text-zinc-500 uppercase tracking-wider font-semibold mb-1">
                    Format
                  </span>
                  <span className="text-white font-bold text-sm">{tournament.format}</span>
                </div>
                <div>
                  <span className="block text-zinc-500 uppercase tracking-wider font-semibold mb-1">
                    Timeline
                  </span>
                  <span className="text-white font-bold text-sm">
                    {startDate} — {endDate}
                  </span>
                </div>
                <div>
                  <span className="block text-zinc-500 uppercase tracking-wider font-semibold mb-1">
                    Bracket Size
                  </span>
                  <span className="text-white font-bold text-sm">
                    {tournament.matches.length > 0
                      ? `${tournament.matches.length * 2} Teams`
                      : "Open Registration"}
                  </span>
                </div>
              </div>
            </div>

            {/* Task 1: Client Component Button for registration */}
            <div className="shrink-0">
              <RegisterTeamButton
                tournamentId={tournament.id}
                tournamentTitle={tournament.title}
                status={tournament.status}
              />
            </div>
          </div>
        </div>

        {/* Tournament Bracket / Matches */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black font-lexend text-white tracking-wide">
              TOURNAMENT FIXTURES & MATCHES
            </h2>
            <span className="text-xs text-zinc-500 font-medium">
              {tournament.matches.length} Scheduled Matches
            </span>
          </div>

          {tournament.matches.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-10 text-center">
              <p className="text-sm text-zinc-400">
                Fixtures will be auto-generated and drawn once team registrations close.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tournament.matches.map((match, idx) => (
                <div
                  key={match.id}
                  className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-zinc-700 transition-all"
                >
                  <span className="text-xs font-mono text-zinc-500 uppercase">
                    Match #{idx + 1}
                  </span>

                  <div className="flex items-center gap-6 font-lexend font-bold text-sm">
                    <span className="text-white">{match.teamA?.name || "TBD"}</span>
                    <span className="px-3 py-1 rounded bg-black/60 border border-zinc-800 font-mono text-xs text-[#ec3661]">
                      {match.score || "VS"}
                    </span>
                    <span className="text-white">{match.teamB?.name || "TBD"}</span>
                  </div>

                  <span className="text-xs text-zinc-400">
                    {new Date(match.scheduledTime).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

