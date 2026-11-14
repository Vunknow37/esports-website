import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Admin Command Center | IITR Esports",
  description: "Administrative console for managing tournaments, rosters, and match schedules.",
};

const NAV_LINKS = [
  { name: "Overview", href: "/admin", icon: "📊" },
  { name: "Tournaments", href: "/events", icon: "🏆" },
  { name: "Teams & Rosters", href: "/teams", icon: "🛡️" },
  { name: "Player Dashboard", href: "/dashboard", icon: "👤" },
  { name: "Public Site", href: "/", icon: "🌐" },
];

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Strict Server Component Admin Role Verification
  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row antialiased">
      {/* Sidebar / Mobile Nav Bar */}
      <aside className="w-full md:w-64 bg-zinc-900/90 border-b md:border-b-0 md:border-r border-zinc-800 p-4 sm:p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header */}
          <div className="flex items-center gap-3 mb-4 md:mb-8">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-[#ec3661] flex items-center justify-center font-black font-lexend text-white text-base sm:text-lg shadow-lg shadow-amber-500/20 shrink-0">
              ⚡
            </div>
            <div>
              <span className="font-black font-lexend text-sm sm:text-base tracking-wide text-white block">
                ADMIN CONSOLE
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                Organizer Access
              </span>
            </div>
          </div>

          {/* Navigation Links - Horizontal scroll ribbon on mobile, vertical stack on desktop */}
          <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-1.5 pb-2 md:pb-0 scrollbar-none">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 sm:gap-3 px-3.5 py-2.5 md:py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all border border-transparent hover:border-zinc-700/60 shrink-0 min-h-[44px]"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Admin Session Info (Hidden on mobile to save vertical viewport) */}
        <div className="hidden md:block pt-6 border-t border-zinc-800/80 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-bold text-amber-400">
              {session.user.name ? session.user.name[0] : "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">
                {session.user.name || "Administrator"}
              </p>
              <p className="text-[10px] text-zinc-500 truncate">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 border-b border-zinc-800 bg-zinc-900/40 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            <span className="text-xs text-zinc-400 font-mono truncate">
              <span className="hidden sm:inline">Database Cluster: </span>Connected
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
              ADMIN
            </span>
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-white transition-colors py-1"
            >
              Exit →
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 md:p-10 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

