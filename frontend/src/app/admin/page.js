import React from "react";
import prisma from "@/lib/prisma";
import CreateTournamentForm from "./CreateTournamentForm";

export default async function AdminOverviewPage() {
  let stats = {
    totalUsers: 0,
    activeTournaments: 0,
    totalTeams: 0,
    totalMatches: 0,
  };

  let recentTournaments = [];

  try {
    const [usersCount, tournamentsCount, teamsCount, matchesCount] = await Promise.all([
      prisma.user.count(),
      prisma.tournament.count({
        where: { status: { in: ["UPCOMING", "ONGOING"] } },
      }),
      prisma.team.count(),
      prisma.match.count(),
    ]);

    stats = {
      totalUsers: usersCount,
      activeTournaments: tournamentsCount,
      totalTeams: teamsCount,
      totalMatches: matchesCount,
    };

    recentTournaments = await prisma.tournament.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { matches: true },
    });
  } catch (error) {
    console.error("Admin stats query error:", error.message);
  }

  const statCards = [
    { label: "Total Registered Players", value: stats.totalUsers, icon: "👥", color: "from-blue-600/30" },
    { label: "Active Tournaments", value: stats.activeTournaments, icon: "🏆", color: "from-purple-600/30" },
    { label: "Formed Teams", value: stats.totalTeams, icon: "🛡️", color: "from-pink-600/30" },
    { label: "Matches Scheduled", value: stats.totalMatches, icon: "⚔️", color: "from-amber-600/30" },
  ];

  return (
    <div className="space-y-10">
      {/* Overview Header */}
      <div>
        <h1 className="text-3xl font-black font-lexend tracking-tight text-white">
          ADMIN OVERVIEW & TELEMETRY
        </h1>
        <p className="text-zinc-400 text-xs mt-1">
          Real-time metrics, active brackets, and rapid tournament deployment tools.
        </p>
      </div>

      {/* 1. Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`p-6 rounded-2xl bg-gradient-to-br ${card.color} to-zinc-900/60 border border-zinc-800 flex items-center justify-between shadow-lg`}
          >
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-zinc-400 block mb-1">
                {card.label}
              </span>
              <span className="text-3xl font-black font-lexend text-white">
                {card.value}
              </span>
            </div>
            <span className="text-3xl">{card.icon}</span>
          </div>
        ))}
      </div>

      {/* 2. Create Tournament Action Form */}
      <CreateTournamentForm />

      {/* 3. Recent Tournaments Table */}
      <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-800">
          <h3 className="text-xl font-black font-lexend text-white">
            RECENT TOURNAMENTS
          </h3>
          <span className="text-xs text-zinc-400">Database Records</span>
        </div>

        {recentTournaments.length === 0 ? (
          <p className="text-xs text-zinc-500 italic">No tournaments in database yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Game</th>
                  <th className="pb-3">Format</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Matches</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-medium">
                {recentTournaments.map((t) => (
                  <tr key={t.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 font-bold text-white">{t.title}</td>
                    <td className="py-3 text-purple-400">{t.gameTitle}</td>
                    <td className="py-3 text-zinc-300">{t.format}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300">
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 text-zinc-400">{t.matches.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

