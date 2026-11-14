"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { createTournament } from "@/app/actions/adminActions";

export default function CreateTournamentForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    const res = await createTournament(formData);
    setLoading(false);

    if (res.success) {
      toast.success(res.message);
      form.reset();
    } else {
      toast.error(res.error || "Failed to create tournament.");
    }
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-zinc-900/70 border border-zinc-800 p-5 sm:p-8 shadow-xl">
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-black font-lexend text-white">
          CREATE NEW TOURNAMENT
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Deploy an upcoming championship bracket directly to the public schedule.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Tournament Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Winter Invitational 2026"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 transition-all min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Game Title
            </label>
            <input
              type="text"
              name="gameTitle"
              required
              placeholder="e.g. Valorant, BGMI, CS2"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 transition-all min-h-[44px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-all min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-all min-h-[44px]"
            />
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Bracket Format
            </label>
            <input
              type="text"
              name="format"
              required
              placeholder="e.g. Double Elimination (5v5)"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 transition-all min-h-[44px]"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-lexend font-bold text-xs uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 active:scale-[0.99] transition-all shadow-lg shadow-purple-600/30 disabled:opacity-50 min-h-[44px] flex items-center justify-center"
          >
            {loading ? "Creating..." : "Publish Tournament"}
          </button>
        </div>
      </form>
    </div>
  );
}
