import React from "react";
import Navbar from "@/app/Components/Navbar/Navbar";
import Footer from "@/app/Components/Footer";

const GALLERY_PHOTOS = [
  {
    title: "Inter-IIT LAN Finals 2025",
    game: "Valorant",
    span: "col-span-1 md:col-span-2 row-span-2",
    gradient: "from-purple-900/60 to-zinc-900",
    aspect: "h-80 md:h-96",
  },
  {
    title: "Championship Trophy Ceremony",
    game: "BGMI",
    span: "col-span-1 row-span-1",
    gradient: "from-pink-900/60 to-zinc-900",
    aspect: "h-48",
  },
  {
    title: "Main Stage Setup & Shoutcasters",
    game: "Production",
    span: "col-span-1 row-span-1",
    gradient: "from-indigo-900/60 to-zinc-900",
    aspect: "h-48",
  },
  {
    title: "Clutch Round 24 Reaction",
    game: "CS2",
    span: "col-span-1 row-span-1",
    gradient: "from-blue-900/60 to-zinc-900",
    aspect: "h-56",
  },
  {
    title: "Audience & Fans Cheering Section",
    game: "Community",
    span: "col-span-1 md:col-span-2 row-span-1",
    gradient: "from-red-900/60 to-zinc-900",
    aspect: "h-56",
  },
];

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-16">
        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Media Hub & Broadcasts
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-lexend tracking-tight text-white">
            PHOTOS & HIGHLIGHTS
          </h1>
          <p className="text-zinc-400 mt-2 text-sm md:text-base max-w-2xl">
            Live stream broadcasts, LAN arena captures, award ceremonies, and unforgettable tournament clutches.
          </p>
        </div>

        {/* 1. Featured Broadcast Video Player (Twitch / YouTube Embed) */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-800">
            <h2 className="text-xl font-bold font-lexend text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              OFFICIAL BROADCAST STREAM
            </h2>
            <span className="text-xs text-zinc-400">Live 1080p60 FPS</span>
          </div>

          <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
              title="Official IITR Esports Tournament Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* 2. Masonry Gallery Layout */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-2 border-b border-zinc-800">
            <h2 className="text-xl font-bold font-lexend text-white">
              LAN TOURNAMENT GALLERY
            </h2>
            <span className="text-xs text-zinc-500">Season Archives</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GALLERY_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-gradient-to-br ${photo.gradient} ${photo.span} ${photo.aspect} p-6 flex flex-col justify-end group hover:border-purple-500/50 transition-all duration-300 shadow-xl`}
              >
                {/* Backdrop Pattern */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                <div className="relative z-10">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 text-purple-300 border border-zinc-700/80 mb-2">
                    {photo.game}
                  </span>
                  <h3 className="font-extrabold text-lg text-white font-lexend drop-shadow-md">
                    {photo.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

