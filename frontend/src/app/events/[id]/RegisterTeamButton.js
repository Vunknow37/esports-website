"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { registerTeamForTournament } from "@/app/actions/tournamentActions";

export default function RegisterTeamButton({ tournamentId, tournamentTitle, status }) {
  const { data: session, status: authStatus } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);

  if (status !== "UPCOMING") return null;

  if (authStatus === "unauthenticated" || !session) {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href={`/login?callbackUrl=/events/${tournamentId}`}
          className="px-6 py-3 rounded-xl font-lexend font-bold text-xs uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/30"
        >
          Sign in to Register Team
        </Link>
        <span className="text-xs text-zinc-500">Requires a verified player account</span>
      </div>
    );
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      toast.error("Please enter a valid team name.");
      return;
    }

    setLoading(true);
    const res = await registerTeamForTournament(tournamentId, teamName);
    setLoading(false);

    if (res.success) {
      toast.success(res.message);
      setIsRegistered(true);
      setMessage(res.message);
      setIsOpen(false);
    } else {
      toast.error(res.error || "Failed to register team.");
    }
  };

  if (isRegistered) {
    return (
      <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-lexend font-bold text-xs uppercase tracking-wider">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
        </svg>
        <span>{message || "Team Registered"}</span>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-8 py-3.5 rounded-xl font-lexend font-bold text-xs uppercase tracking-wider text-white bg-[#ec3661] hover:bg-[#d62851] active:scale-95 transition-all shadow-lg shadow-[#ec3661]/30 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Register Team</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 md:p-8 shadow-2xl relative">
            <h3 className="text-xl font-black text-white font-lexend mb-2">
              REGISTER YOUR ROSTER
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Registering for <span className="text-purple-400 font-bold">{tournamentTitle}</span> as{" "}
              <span className="text-white font-semibold">@{session.user?.name || "Captain"}</span>.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Phoenix Syndicate"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 transition-all disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Confirm Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
