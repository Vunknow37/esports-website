"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * Security helper: Ensures current session belongs to an ADMIN.
 */
async function verifyAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "ADMIN") {
    throw new Error("Access Denied: Administrator role required.");
  }
  return session;
}

/**
 * Server Action: Create a new tournament
 */
export async function createTournament(formData) {
  try {
    await verifyAdminSession();

    // Support both FormData object and plain JSON payload
    const title = typeof formData.get === "function" ? formData.get("title") : formData.title;
    const gameTitle = typeof formData.get === "function" ? formData.get("gameTitle") : formData.gameTitle;
    const startDateRaw = typeof formData.get === "function" ? formData.get("startDate") : formData.startDate;
    const endDateRaw = typeof formData.get === "function" ? formData.get("endDate") : formData.endDate;
    const format = typeof formData.get === "function" ? formData.get("format") : formData.format;

    if (!title || !gameTitle || !startDateRaw || !format) {
      return { success: false, error: "Missing required tournament fields." };
    }

    const startDate = new Date(startDateRaw);
    const endDate = endDateRaw ? new Date(endDateRaw) : new Date(startDate.getTime() + 7 * 86400000);

    const tournament = await prisma.tournament.create({
      data: {
        title,
        gameTitle,
        startDate,
        endDate,
        format,
        status: "UPCOMING",
      },
    });

    // Revalidate paths to update cached Server Components
    revalidatePath("/admin");
    revalidatePath("/events");
    revalidatePath("/");

    return {
      success: true,
      message: `Tournament "${tournament.title}" created successfully!`,
      tournamentId: tournament.id,
    };
  } catch (error) {
    console.error("createTournament error:", error);
    return { success: false, error: error.message || "Failed to create tournament." };
  }
}

/**
 * Server Action: Update score for a specific match
 */
export async function updateMatchScore(matchId, score) {
  try {
    await verifyAdminSession();

    if (!matchId || typeof score !== "string") {
      return { success: false, error: "Invalid match ID or score format." };
    }

    const updatedMatch = await prisma.match.update({
      where: { id: matchId },
      data: { score },
    });

    revalidatePath("/admin");
    revalidatePath("/events");
    revalidatePath("/");

    return {
      success: true,
      message: `Match score updated to ${score}`,
      match: updatedMatch,
    };
  } catch (error) {
    console.error("updateMatchScore error:", error);
    return { success: false, error: error.message || "Failed to update match score." };
  }
}

/**
 * Server Action: Update player gamerTag / IGN (Self-service for Dashboard)
 */
export async function updateGamerTag(gamerTag) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return { success: false, error: "Authentication required." };
    }

    if (!gamerTag || gamerTag.trim().length < 2) {
      return { success: false, error: "Gamer tag must be at least 2 characters long." };
    }

    const cleanTag = gamerTag.trim();

    await prisma.user.update({
      where: { email: session.user.email },
      data: { gamerTag: cleanTag },
    });

    revalidatePath("/dashboard");
    revalidatePath("/teams");

    return {
      success: true,
      message: `Gamer tag updated to @${cleanTag}`,
      gamerTag: cleanTag,
    };
  } catch (error) {
    console.error("updateGamerTag error:", error);
    return { success: false, error: "Gamer tag is already taken or invalid." };
  }
}

