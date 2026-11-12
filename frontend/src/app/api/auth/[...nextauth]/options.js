import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const options = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLEAUTH_SECRET || process.env.GOOGLE_SECRET || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "USER";
        token.gamerTag = user.gamerTag || null;
        token.discordId = user.discordId || null;
      }

      // Allow client to trigger session updates (e.g. after updating gamerTag)
      if (trigger === "update" && session?.gamerTag) {
        token.gamerTag = session.gamerTag;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role || "USER";
        session.user.gamerTag = token.gamerTag || null;
        session.user.discordId = token.discordId || null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "default_super_secret_esports_key_12345",
};
