"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../../../public/assets/image 20.svg";
import "./Navbar.css";
import menu from "../../../../public/assets/menu.png";

const navArray = [
  { title: "EVENTS", link: "/events" },
  { title: "MEDIA", link: "/media" },
  { title: "TEAMS", link: "/teams" },
  { title: "ABOUT US", link: "/about" },
  { title: "LOGIN", link: "/login" },
];

export default function Navbar() {
  const [open, setOpen] = useState(true);

  return (
    <nav className="bg-[#101010] justify-between md:pl-24 md:pr-10 p-7 flex flex-col md:flex-row font-lexend align-middle w-full m-auto border-b border-zinc-800/60">
      <div className="flex flex-row justify-between items-center">
        <Image
          src={menu}
          alt="menu"
          className={`w-8 h-8 relative top-0 invert md:hidden cursor-pointer transition-all duration-500 ${
            !open ? "rotate-90" : "rotate-0"
          }`}
          onClick={() => setOpen(!open)}
        />

        <Link href="/" className="sm:mx-auto md:m-0">
          <Image src={logo} alt="IITR Esports Logo" priority />
        </Link>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden flex flex-col overflow-hidden transition-all duration-500 ${
          open ? "h-0" : "h-64 pt-4"
        }`}
      >
        {navArray.map((navLink, i) => {
          if (i !== 4) {
            return (
              <Link
                key={i}
                href={navLink.link}
                onClick={() => setOpen(true)}
                className="navlinkStyle my-3 ml-5 tracking-widest text-zinc-300 hover:text-white"
              >
                {navLink.title}
              </Link>
            );
          } else {
            return (
              <Link
                key={i}
                href="/login"
                onClick={() => setOpen(true)}
                className="bg-purple-600 font-lexend font-black hover:bg-white transition-all duration-300 hover:text-black m-auto text-white py-[10px] px-[60px] text-center rounded-lg mt-2"
              >
                LOGIN
              </Link>
            );
          }
        })}
      </div>

      {/* Desktop Menu */}
      <div className="md:flex flex-row md:m-auto md:mr-0 my-auto hidden items-center gap-2">
        {navArray.map((navLink, i) => {
          if (i !== 4) {
            return (
              <Link
                key={i}
                href={navLink.link}
                className="navlinkStyle mx-4 tracking-widest text-sm text-zinc-300 hover:text-white transition-colors"
              >
                {navLink.title}
              </Link>
            );
          } else {
            return (
              <Link
                key={i}
                href="/login"
                className="bg-purple-600 tracking-widest ml-6 font-lexend font-black hover:bg-white transition-all duration-300 text-xs hover:text-black text-white py-2.5 px-6 rounded-lg uppercase shadow-lg shadow-purple-600/20"
              >
                LOGIN
              </Link>
            );
          }
        })}
      </div>
    </nav>
  );
}
