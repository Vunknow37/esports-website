const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Esports Platform database...");

  // 1. Create or Upsert Admin User
  const admin = await prisma.user.upsert({
    where: { email: "admin@iitresports.com" },
    update: {},
    create: {
      name: "Aarav Sharma",
      email: "admin@iitresports.com",
      gamerTag: "Valkyrie",
      role: "ADMIN",
      discordId: "Valkyrie#1337",
    },
  });

  // 2. Create Players
  const player1 = await prisma.user.upsert({
    where: { email: "player1@iitresports.com" },
    update: {},
    create: {
      name: "Rohan Verma",
      email: "player1@iitresports.com",
      gamerTag: "Spectre",
      role: "USER",
    },
  });

  const player2 = await prisma.user.upsert({
    where: { email: "player2@iitresports.com" },
    update: {},
    create: {
      name: "Sneha Patel",
      email: "player2@iitresports.com",
      gamerTag: "Nyx",
      role: "USER",
    },
  });

  const player3 = await prisma.user.upsert({
    where: { email: "player3@iitresports.com" },
    update: {},
    create: {
      name: "Kunal Singhal",
      email: "player3@iitresports.com",
      gamerTag: "Blaze",
      role: "USER",
    },
  });

  // 3. Create Teams
  const team1 = await prisma.team.upsert({
    where: { name: "Roorkee Titans" },
    update: {},
    create: {
      name: "Roorkee Titans",
      captainId: admin.id,
      members: {
        connect: [{ id: admin.id }, { id: player1.id }],
      },
    },
  });

  const team2 = await prisma.team.upsert({
    where: { name: "Phoenix Syndicate" },
    update: {},
    create: {
      name: "Phoenix Syndicate",
      captainId: player2.id,
      members: {
        connect: [{ id: player2.id }, { id: player3.id }],
      },
    },
  });

  const team3 = await prisma.team.upsert({
    where: { name: "Apex Predators" },
    update: {},
    create: {
      name: "Apex Predators",
      captainId: player1.id,
    },
  });

  // 4. Create Tournaments
  const now = new Date();

  const tourney1 = await prisma.tournament.create({
    data: {
      title: "IITR Valorant Winter Invitational 2026",
      gameTitle: "Valorant",
      startDate: new Date(now.getTime() - 2 * 86400000),
      endDate: new Date(now.getTime() + 5 * 86400000),
      format: "Double Elimination (5v5)",
      status: "ONGOING",
    },
  });

  const tourney2 = await prisma.tournament.create({
    data: {
      title: "Inter-Collegiate BGMI Championship",
      gameTitle: "BGMI",
      startDate: new Date(now.getTime() + 7 * 86400000),
      endDate: new Date(now.getTime() + 14 * 86400000),
      format: "Battle Royale (Squads)",
      status: "UPCOMING",
    },
  });

  const tourney3 = await prisma.tournament.create({
    data: {
      title: "Autumn CS2 Campus Cup",
      gameTitle: "CS2",
      startDate: new Date(now.getTime() - 30 * 86400000),
      endDate: new Date(now.getTime() - 25 * 86400000),
      format: "Single Elimination (5v5)",
      status: "COMPLETED",
    },
  });

  // 5. Create Matches
  await prisma.match.create({
    data: {
      tournamentId: tourney1.id,
      teamA_Id: team1.id,
      teamB_Id: team2.id,
      score: "11 - 13",
      scheduledTime: new Date(now.getTime() + 3600000), // 1 hour from now
    },
  });

  await prisma.match.create({
    data: {
      tournamentId: tourney1.id,
      teamA_Id: team2.id,
      teamB_Id: team3.id,
      score: "13 - 7",
      scheduledTime: new Date(now.getTime() + 86400000), // tomorrow
    },
  });

  // 6. Announcements
  await prisma.announcement.createMany({
    data: [
      {
        title: "Season 2026 Collegiate Circuit Announced!",
        content:
          "Registration is officially open for the Winter Invitational across Valorant, BGMI, and CS2. Check the Events tab for format details.",
        authorId: admin.id,
        date: new Date(now.getTime() - 86400000),
      },
      {
        title: "LAN Qualifiers at Student Activities Centre (SAC)",
        content:
          "The top 4 bracket teams will compete offline on high-refresh-rate rigs at the SAC amphitheatre with live caster commentary.",
        authorId: admin.id,
        date: new Date(now.getTime() - 3 * 86400000),
      },
      {
        title: "Weekly Scrim Lobbies Live on Discord",
        content:
          "Daily practice lobbies open every evening at 8:00 PM IST on our official Discord server. Captains must verify IGNs beforehand.",
        authorId: admin.id,
        date: new Date(now.getTime() - 5 * 86400000),
      },
    ],
  });

  console.log("✅ Seed completed successfully with mock tournaments, teams, and matches!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

