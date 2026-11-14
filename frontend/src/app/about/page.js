import React from "react";
import Navbar from "@/app/Components/Navbar/Navbar";
import Footer from "@/app/Components/Footer";

const COMMITTEE = [
  { name: "Aarav Sharma", ign: "Valkyrie", role: "Club President & Founder", game: "Valorant" },
  { name: "Rohan Verma", ign: "Spectre", role: "Vice President & Operations", game: "CS2" },
  { name: "Sneha Patel", ign: "Nyx", role: "Head of Tournament Logistics", game: "BGMI" },
  { name: "Devansh Mehta", ign: "Cipher", role: "Technical Lead & Web Dev", game: "Production" },
  { name: "Kunal Singhal", ign: "Blaze", role: "Media & Broadcast Director", game: "Casting" },
  { name: "Ananya Roy", ign: "Apex", role: "Community & Scrims Coordinator", game: "Dota 2" },
];

const STATS = [
  { label: "Active Club Members", val: "650+" },
  { label: "Tournaments Hosted", val: "32+" },
  { label: "Inter-IIT Trophies", val: "5" },
  { label: "Prize Pool Distributed", val: "₹10L+" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            About IITR Esports
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black font-lexend tracking-tight text-white mb-4 sm:mb-6">
            FORGING CHAMPIONS ON & OFF THE SERVER
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed">
            The official competitive esports organization of IIT Roorkee, dedicated to institutionalizing collegiate gaming, organizing premier LAN championships, and representing the institute nationwide.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-14 sm:mb-20">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="p-4 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#ec3661] font-lexend mb-1">
                {s.val}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission & History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-14 sm:mb-20">
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-black font-lexend text-white flex items-center gap-2">
              <span className="w-2 h-6 rounded-full bg-purple-500" />
              OUR MISSION
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We bridge the gap between casual collegiate gaming and tier-1 esports careers. Our mission is to nurture strategic thinking, teamwork, and quick decision-making through competitive gaming circuits while providing state-of-the-art broadcast production and tournament management.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-black font-lexend text-white flex items-center gap-2">
              <span className="w-2 h-6 rounded-full bg-[#ec3661]" />
              THE JOURNEY
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Founded by passionate hostel gamers in 2021, IITR Esports grew from late-night Discord scrims into an accredited institute sports body with dedicated training bootcamps, official LAN arenas, and national tournament podium finishes.
            </p>
          </div>
        </div>

        {/* Committee Grid */}
        <section>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black font-lexend text-white">
              EXECUTIVE COMMITTEE
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-2">
              Meet the leadership team driving tournaments, rosters, and club operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {COMMITTEE.map((member) => (
              <div
                key={member.name}
                className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/40 transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-600/30 to-zinc-800 border border-purple-500/30 flex items-center justify-center font-black font-lexend text-white text-base sm:text-lg shrink-0">
                  {member.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white font-lexend text-sm sm:text-base truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs text-purple-400 font-semibold mb-1 truncate">
                    @{member.ign}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">
                    {member.role}
                  </p>
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

