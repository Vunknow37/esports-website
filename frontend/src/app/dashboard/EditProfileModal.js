"use client";

import React, { useState } from "react";
import { updateGamerTag } from "@/app/actions/adminActions";
import { useSession } from "next-auth/react";

export default function EditProfileModal({ currentTag }) {
  const [isOpen, setIsOpen] = useState(false);
  const [gamerTag, setGamerTag] = useState(currentTag || "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const { update } = useSession();

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await updateGamerTag(gamerTag);
    setLoading(false);

    if (res.success) {
      setStatus({ success: true, message: res.message });
      if (update) {
        await update({ gamerTag: res.gamerTag });
      }
      setTimeout(() => setIsOpen(false), 900);
    } else {
      setStatus({ success: false, message: res.error });
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-600/20 hover:bg-purple-600 hover:text-white border border-purple-500/30 transition-all"
      >
        Edit IGN / Profile
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl relative">
            <h3 className="text-lg font-black text-white font-lexend mb-1">
              EDIT IN-GAME TAG (IGN)
            </h3>
            <p className="text-xs text-zinc-400 mb-5">
              Your gamer tag will be visible on tournament match sheets and rosters.
            </p>

            {status && (
              <div
                className={`p-3 rounded-lg text-xs font-semibold mb-4 border ${
                  status.success
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Gamer Tag / IGN
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-zinc-500 font-mono text-sm">@</span>
                  <input
                    type="text"
                    required
                    placeholder="ShadowStrike"
                    value={gamerTag}
                    onChange={(e) => setGamerTag(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Tag"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

