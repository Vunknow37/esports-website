import React from "react";
import Link from "next/link";

const SPONSORS = [
  { name: "HYPERX", tier: "Title Partner" },
  { name: "ROG GAMING", tier: "Hardware Partner" },
  { name: "RED BULL", tier: "Energy Partner" },
  { name: "CORSAIR", tier: "Peripherals Partner" },
  { name: "DISCORD", tier: "Community Partner" },
];

const QUICK_LINKS = [
  { name: "Events & Brackets", href: "/events" },
  { name: "Teams & Rosters", href: "/teams" },
  { name: "Media & Highlights", href: "/media" },
  { name: "About the Club", href: "/about" },
  { name: "Contact & Scrims", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-zinc-800 text-zinc-400">
      {/* 1. Sponsors & Partners Section */}
      <div className="border-b border-zinc-800/80 py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">
            Official Sponsors & Strategic Partners
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {SPONSORS.map((sponsor) => (
              <div
                key={sponsor.name}
                className="group flex flex-col items-center justify-center p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-purple-500/40 hover:bg-zinc-900/80 transition-all duration-200"
              >
                <span className="font-lexend font-black text-sm tracking-wider text-zinc-300 group-hover:text-white transition-colors">
                  {sponsor.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1">
                  {sponsor.tier}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto py-14 px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand / Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-white font-lexend tracking-wider">
              IITR <span className="text-[#ec3661]">ESPORTS</span>
            </span>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
            Fostering competitive gaming talent, collegiate tournaments, and high-performance esports
            teams at IIT Roorkee.
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-lexend mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-purple-400 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-lexend mb-4">
            Connect With Us
          </h4>
          <p className="text-sm text-zinc-400 mb-4">
            Join our competitive Discord community for scrim announcements, team matching, and live banter.
          </p>
          <div className="flex items-center gap-3">
            {/* Discord */}
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#5865F2] hover:border-[#5865F2] transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#E4405F] hover:border-[#E4405F] transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Copyright bar */}
      <div className="border-t border-zinc-900 py-6 px-6 md:px-16 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} IITR Esports Club. Built with Next.js 14, Tailwind CSS, & Prisma.</p>
      </div>
    </footer>
  );
}

