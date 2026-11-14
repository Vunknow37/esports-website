import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Navbar from "@/app/Components/Navbar/Navbar";
import Footer from "@/app/Components/Footer";
import EditProfileModal from "./EditProfileModal";
import SignOutButton from "@/app/Components/SignOutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  let dbUser = null;
  let upcomingMatches = [];

  try {
    dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        team: {
          include: {
            captain: { select: { id: true, name: true, gamerTag: true } },
            members: { select: { id: true, name: true, gamerTag: true, role: true } },
            matchesAsA: {
              where: { scheduledTime: { gte: new Date() } },
              orderBy: { scheduledTime: "asc" },
              take: 2,
              include: { tournament: true, teamB: true },
            },
            matchesAsB: {
              where: { scheduledTime: { gte: new Date() } },
              orderBy: { scheduledTime: "asc" },
              take: 2,
              include: { tournament: true, teamA: true },
            },
          },
        },
      },
    });

    if (dbUser?.team) {
      const allMatches = [
        ...(dbUser.team.matchesAsA || []).map((m) => ({ ...m, opponent: m.teamB })),
        ...(dbUser.team.matchesAsB || []).map((m) => ({ ...m, opponent: m.teamA })),
      ].sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));

      upcomingMatches = allMatches.slice(0, 3);
    }
  } catch (error) {
    // Database connection offline fallback
  }

  const user = dbUser || {
    name: session.user.name,
    email: session.user.email,
    gamerTag: session.user.gamerTag || null,
    discordId: session.user.discordId || null,
    role: session.user.role || "USER",
    team: null,
  };

  const isAdmin = user.role === "ADMIN";

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Welcome Topbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Competitive Portal
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-lexend tracking-tight text-white">
              PLAYER DASHBOARD
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="px-4 sm:px-5 py-2.5 rounded-xl font-lexend font-bold text-xs uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all min-h-[44px] flex items-center"
              >
                ⚙ Admin Panel
              </Link>
            )}
            <Link
              href="/events"
              className="px-4 sm:px-5 py-2.5 rounded-xl font-lexend font-bold text-xs uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/30 min-h-[44px] flex items-center"
            >
              Browse Tournaments
            </Link>
            <SignOutButton />
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Column 1: Profile Card */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <div className="rounded-2xl sm:rounded-3xl bg-zinc-900/70 border border-zinc-800 p-5 sm:p-8 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Player Identity
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    user.role === "ADMIN"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  }`}
                >
                  {user.role}
                </span>
              </div>

              {/* Avatar & Names */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-[#ec3661] flex items-center justify-center font-black font-lexend text-xl sm:text-2xl text-white shadow-lg shadow-purple-600/20 shrink-0">
                  {user.name ? user.name[0].toUpperCase() : "P"}
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-lg sm:text-xl text-white font-lexend leading-tight truncate">
                    {user.name || "Player"}
                  </h3>
                  <p className="text-sm font-mono text-purple-400 font-semibold truncate">
                    {user.gamerTag ? `@${user.gamerTag}` : "@unassigned_tag"}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                </div>
              </div>

              {/* Metadata Details */}
              <div className="space-y-3 pt-4 border-t border-zinc-800/80 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-semibold uppercase">Discord ID</span>
                  <span className="text-zinc-300 font-mono truncate max-w-[150px]">
                    {user.discordId || "Linked via NextAuth"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-semibold uppercase">Roster Status</span>
                  <span className="text-zinc-300 font-semibold">
                    {user.team ? user.team.name : "Free Agent"}
                  </span>
                </div>
              </div>

              {/* Edit Modal Trigger */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
                <EditProfileModal currentTag={user.gamerTag} />
              </div>
            </div>
          </div>

          {/* Column 2 & 3: My Team & Match Schedule */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Section 1: My Team */}
            <div className="rounded-2xl sm:rounded-3xl bg-zinc-900/70 border border-zinc-800 p-5 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-5 sm:mb-6 pb-2 border-b border-zinc-800">
                <h2 className="text-lg sm:text-xl font-bold font-lexend text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  MY TEAM ROSTER
                </h2>
                {user.team && (
                  <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                    {user.team.members?.length || 1} Members
                  </span>
                )}
              </div>

              {!user.team ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 text-center">
                  <p className="text-xs sm:text-sm text-zinc-400 mb-4">
                    You are not currently enrolled in a team roster.
                  </p>
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md shadow-purple-600/20 min-h-[44px]"
                  >
                    Register Team for Tournament
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black font-lexend text-white">
                        {user.team.name}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Captain: <span className="text-purple-400 font-semibold">@{user.team.captain?.gamerTag || user.team.captain?.name}</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    {user.team.members?.map((member) => (
                      <div
                        key={member.id}
                        className="p-3.5 rounded-xl bg-zinc-800/50 border border-zinc-700/60 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                          <span className="text-xs font-bold text-white truncate">
                            {member.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-purple-300 shrink-0 ml-2">
                          @{member.gamerTag || "no_tag"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Match Schedule */}
            <div className="rounded-2xl sm:rounded-3xl bg-zinc-900/70 border border-zinc-800 p-5 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-5 sm:mb-6 pb-2 border-b border-zinc-800">
                <h2 className="text-lg sm:text-xl font-bold font-lexend text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  UPCOMING FIXTURES
                </h2>
                <span className="text-xs text-zinc-500 font-medium">Next Matches</span>
              </div>

              {upcomingMatches.length === 0 ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 text-center">
                  <p className="text-xs sm:text-sm text-zinc-400">
                    No upcoming match fixtures currently assigned to your team.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingMatches.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-xl sm:rounded-2xl bg-zinc-800/40 border border-zinc-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                          {m.tournament?.gameTitle || "Esports"} — {m.tournament?.title}
                        </span>
                        <div className="text-xs sm:text-sm font-bold text-white mt-1">
                          VS {m.opponent?.name || "TBD Rival"}
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-zinc-300 bg-black/40 px-3 py-1.5 rounded-lg border border-zinc-700 shrink-0">
                        {new Date(m.scheduledTime).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

