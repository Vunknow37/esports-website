"use client";

import React, { useState } from "react";
import { createTournament } from "@/app/actions/adminActions";

export default function CreateTournamentForm() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const form = e.target;
    const formData = new FormData(form);

    const res = await createTournament(formData);
    setLoading(false);

    if (res.success) {
      setFeedback({ success: true, message: res.message });
      form.reset();
    } else {
      setFeedback({ success: false, message: res.error });
    }
  };

  return (
    <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-8 shadow-xl">
      <div className="mb-6">
        <h3 className="text-xl font-black font-lexend text-white">
          CREATE NEW TOURNAMENT
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Deploy an upcoming championship bracket directly to the public schedule.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold mb-6 border ${
            feedback.success
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Tournament Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Winter Invitational 2026"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          {/* Game Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Game Title
            </label>
            <input
              type="text"
              name="gameTitle"
              required
              placeholder="e.g. Valorant, BGMI, CS2"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Start Date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          {/* Format */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Bracket Format
            </label>
            <input
              type="text"
              name="format"
              required
              placeholder="e.g. Double Elimination (5v5)"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl font-lexend font-bold text-xs uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 active:scale-[0.99] transition-all shadow-lg shadow-purple-600/30 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Publish Tournament"}
          </button>
        </div>
      </form>
    </div>
  );
}

