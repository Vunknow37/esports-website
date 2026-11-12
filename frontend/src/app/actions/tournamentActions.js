"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function registerTeamForTournament(tournamentId, teamName) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return { success: false, error: "You must be signed in to register a team." };
    }

    if (!teamName || teamName.trim().length < 2) {
      return { success: false, error: "Team name must be at least 2 characters long." };
    }

    const cleanTeamName = teamName.trim();

    // 1. Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { team: true },
    });

    if (!user) {
      return { success: false, error: "Player record not found." };
    }

    // 2. Fetch tournament
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: { matches: true },
    });

    if (!tournament) {
      return { success: false, error: "Tournament not found." };
    }

    if (tournament.status !== "UPCOMING") {
      return { success: false, error: "Registrations are only open for upcoming tournaments." };
    }

    // 3. Find or Create Team
    let team = await prisma.team.findUnique({
      where: { name: cleanTeamName },
    });

    if (!team) {
      team = await prisma.team.create({
        data: {
          name: cleanTeamName,
          captainId: user.id,
          members: {
            connect: { id: user.id },
          },
        },
      });

      // Update user's teamId
      await prisma.user.update({
        where: { id: user.id },
        data: { teamId: team.id },
      });
    }

    // 4. Create a fixture match if odd number of teams or assign to schedule
    const existingMatches = tournament.matches;
    const isAlreadyCompeting = existingMatches.some(
      (m) => m.teamA_Id === team.id || m.teamB_Id === team.id
    );

    if (isAlreadyCompeting) {
      return { success: false, error: `Team "${team.name}" is already registered in this bracket!` };
    }

    // Pair with another single team or create new fixture
    const openMatch = existingMatches.find(
      (m) => m.teamA_Id && (!m.teamB_Id || m.teamB_Id === m.teamA_Id)
    );

    if (openMatch) {
      await prisma.match.update({
        where: { id: openMatch.id },
        data: { teamB_Id: team.id },
      });
    } else {
      await prisma.match.create({
        data: {
          tournamentId: tournament.id,
          teamA_Id: team.id,
          teamB_Id: team.id, // placeholder until second team joins
          score: "Upcoming",
          scheduledTime: new Date(tournament.startDate.getTime() + 86400000),
        },
      });
    }

    revalidatePath(`/events/${tournamentId}`);
    revalidatePath("/events");
    revalidatePath("/teams");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: `Team "${team.name}" successfully registered for ${tournament.title}!`,
    };
  } catch (error) {
    console.error("registerTeamForTournament error:", error);
    return { success: false, error: error.message || "Failed to register team." };
  }
}

