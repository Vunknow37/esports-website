"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import logo from "../../../../public/assets/image 20.svg";
import "./Navbar.css";
import menu from "../../../../public/assets/menu.png";
import SignOutButton from "../SignOutButton";

const NAV_LINKS = [
  { title: "EVENTS", link: "/events" },
  { title: "MEDIA", link: "/media" },
  { title: "TEAMS", link: "/teams" },
  { title: "ABOUT US", link: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <nav className="bg-[#101010]/95 backdrop-blur-md justify-between md:pl-20 md:pr-10 p-5 md:py-6 flex flex-col md:flex-row font-lexend align-middle w-full m-auto border-b border-zinc-800/80 sticky top-0 z-40">
      {/* Brand & Mobile Hamburger */}
      <div className="flex flex-row justify-between items-center">
        <Image
          src={menu}
          alt="menu toggle"
          className={`w-7 h-7 invert md:hidden cursor-pointer transition-transform duration-300 ${
            open ? "rotate-90" : "rotate-0"
          }`}
          onClick={() => setOpen(!open)}
        />

        <Link href="/" className="sm:mx-auto md:m-0 flex items-center gap-3">
          <Image src={logo} alt="IITR Esports Logo" priority className="h-9 w-auto" />
        </Link>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden flex flex-col overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pt-6 pb-2" : "max-h-0"
        }`}
      >
        {NAV_LINKS.map((navLink) => (
          <Link
            key={navLink.link}
            href={navLink.link}
            onClick={() => setOpen(false)}
            className="my-2.5 ml-4 tracking-widest text-sm text-zinc-300 hover:text-white transition-colors"
          >
            {navLink.title}
          </Link>
        ))}

        <div className="pt-4 mt-2 border-t border-zinc-800 flex flex-col gap-2.5 ml-4">
          {status === "authenticated" ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="text-xs font-bold uppercase tracking-wider text-amber-400 py-1"
                >
                  ⚙ Admin Console
                </Link>
              )}
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-purple-400 py-1"
              >
                👤 @{user?.gamerTag || user?.name || "Player"} (Dashboard)
              </Link>
              <div className="pt-1">
                <SignOutButton />
              </div>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="bg-purple-600 font-lexend font-black text-center text-white py-2.5 px-6 rounded-lg text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="md:flex flex-row md:m-auto md:mr-0 my-auto hidden items-center gap-1 lg:gap-3">
        {NAV_LINKS.map((navLink) => (
          <Link
            key={navLink.link}
            href={navLink.link}
            className="mx-3 tracking-widest text-xs font-bold uppercase text-zinc-400 hover:text-white transition-colors"
          >
            {navLink.title}
          </Link>
        ))}

        {/* Auth State Button Container */}
        <div className="ml-5 flex items-center gap-3">
          {status === "authenticated" ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
                >
                  Admin
                </Link>
              )}

              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-200 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-purple-500/50 transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="font-mono text-purple-300">
                  @{user?.gamerTag || user?.name?.split(" ")[0] || "Profile"}
                </span>
              </Link>

              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-purple-600 tracking-widest font-lexend font-black hover:bg-purple-500 transition-all text-xs text-white py-2.5 px-6 rounded-xl uppercase shadow-lg shadow-purple-600/25 active:scale-95 border border-purple-400/30"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
