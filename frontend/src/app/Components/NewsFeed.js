import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function NewsFeed() {
  let announcements = [];

  try {
    announcements = await prisma.announcement.findMany({
      take: 3,
      orderBy: { date: "desc" },
      include: {
        author: {
          select: {
            name: true,
            gamerTag: true,
            image: true,
          },
        },
      },
    });
  } catch (error) {
    // Database connection offline fallback
    announcements = [];
  }

  return (
    <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto w-full border-t border-zinc-800/80">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
          Club Dispatches
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white font-lexend tracking-tight">
          LATEST NEWS & ANNOUNCEMENTS
        </h2>
        <p className="text-zinc-400 mt-2 text-sm max-w-xl">
          Roster updates, upcoming LAN qualifiers, scrim sessions, and community alerts.
        </p>
      </div>

      {/* Grid or Empty State */}
      {announcements.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-10 text-center">
          <p className="text-zinc-400 text-sm font-medium">
            No announcements posted yet. Check back soon for tournament registrations and club news!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((item) => {
            const pubDate = new Date(item.date);

            return (
              <article
                key={item.id}
                className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-6 flex flex-col justify-between hover:border-purple-500/40 hover:bg-zinc-900/80 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                    <span>
                      {pubDate.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="font-semibold text-purple-400">
                      {item.author?.gamerTag
                        ? `@${item.author.gamerTag}`
                        : item.author?.name || "Esports Official"}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white font-lexend leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                    {item.content}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Official Announcement</span>
                  <Link
                    href="/about"
                    className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

