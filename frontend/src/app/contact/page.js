"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, sendContactEmail } from "@/app/actions/contact";
import Navbar from "@/app/Components/Navbar/Navbar";
import Footer from "@/app/Components/Footer";

export default function ContactPage() {
  const [submissionStatus, setSubmissionStatus] = useState(null); // { success: boolean, message: string }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setSubmissionStatus(null);
    const result = await sendContactEmail(data);

    if (result.success) {
      setSubmissionStatus({
        success: true,
        message: "Your message has been dispatched! Our operations team will respond within 24 hours.",
      });
      reset();
    } else {
      setSubmissionStatus({
        success: false,
        message: result.error || "An error occurred while submitting your message.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Left Column: Info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Support & Inquiries
              </div>
              <h1 className="text-3xl md:text-5xl font-black font-lexend tracking-tight text-white mb-4">
                GET IN TOUCH
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Have questions about tournament registration, inter-college scrims, or corporate sponsorship packages? Send us a dispatch.
              </p>
            </div>

            {/* Quick Contact Info */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Email
                </span>
                <span className="text-sm font-semibold text-white">
                  esports@iitr.ac.in
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Discord Server
                </span>
                <span className="text-sm font-semibold text-purple-400">
                  discord.gg/iitresports
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Location
                </span>
                <span className="text-sm text-zinc-300">
                  Student Activities Centre (SAC), IIT Roorkee
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-3">
            <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-8 md:p-10 shadow-2xl backdrop-blur-xl">
              {/* Notification Banner */}
              {submissionStatus && (
                <div
                  className={`p-4 rounded-xl text-xs font-semibold mb-6 flex items-start gap-3 border ${
                    submissionStatus.success
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                >
                  <span className="text-base">{submissionStatus.success ? "✓" : "⚠"}</span>
                  <p>{submissionStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="e.g. Alex Mercer"
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-800/80 border text-white placeholder-zinc-500 text-sm focus:outline-none transition-all ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-zinc-700/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400 font-medium">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="alex@domain.com"
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-800/80 border text-white placeholder-zinc-500 text-sm focus:outline-none transition-all ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-zinc-700/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    {...register("subject")}
                    placeholder="e.g. Scrim match inquiry / Partnership"
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-800/80 border text-white placeholder-zinc-500 text-sm focus:outline-none transition-all ${
                      errors.subject
                        ? "border-red-500 focus:border-red-500"
                        : "border-zinc-700/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-red-400 font-medium">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    {...register("message")}
                    placeholder="Provide details about your query or team specifications..."
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-800/80 border text-white placeholder-zinc-500 text-sm focus:outline-none transition-all ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-zinc-700/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400 font-medium">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-lexend font-bold text-xs uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 active:scale-[0.99] transition-all shadow-lg shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        <span>Transmitting Dispatch...</span>
                      </>
                    ) : (
                      <span>Submit Inquiry</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

