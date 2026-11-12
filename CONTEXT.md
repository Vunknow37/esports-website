# 📘 CONTEXT.md — Project Technical & Architectural Reference

> **Purpose**: This document serves as the single source of truth for the technical architecture, data contracts, security models, and design patterns utilized across the **IITR Esports Platform**. Read this file before extending or refactoring any part of the codebase.

---

## 1. Project Overview & Vision
- **Organization**: IIT Roorkee Esports Club.
- **Goal**: Provide a competitive gaming portal for hosting collegiate tournaments, managing verified team rosters, broadcasting LAN event media, enabling community engagement, and offering administrative tournament bracket operations.
- **Target Games**: Valorant, BGMI, Counter-Strike 2 (CS2), Dota 2, and other collegiate esports titles.

---

## 2. Core Technical Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `14.1.0` | React Server Components, Server Actions, streaming, dynamic routing |
| **Language** | JavaScript (ESNext) | — | Pure JS with `jsconfig.json` module path resolution (`@/*`) |
| **Styling** | Tailwind CSS | `3.3.0` | Utility-first dark gaming theme, glassmorphism, responsive grid |
| **Database** | PostgreSQL | `15+` | Relational data persistence |
| **ORM** | Prisma ORM | `5.22.0` | Type-safe query building, migrations, schema modeling |
| **Auth** | NextAuth.js | `4.24.5` | OAuth (Google & Discord), JWT session strategy, RBAC |
| **Auth Adapter**| `@next-auth/prisma-adapter` | `1.0.7` | Syncs OAuth accounts and sessions to PostgreSQL |
| **Validation** | Zod | `3.23.8` | Schema validation on client and server |
| **Forms** | React Hook Form | `7.x` | High-performance uncontrolled form handling with Zod resolvers |

---

## 3. Directory Layout & Module Aliasing

All frontend source files reside inside `frontend/src`.
The module alias `@/*` maps directly to `frontend/src/*` via **`frontend/jsconfig.json`**:

```text
e:\coding\esports\main website\
├── start.bat                     # Windows one-click launcher
├── README.md                     # High-level overview & setup
├── CONTEXT.md                    # Technical reference document (this file)
├── .gitignore                    # Root gitignore (RSA keys, certs, .env)
└── frontend/
    ├── jsconfig.json             # Root path aliasing: "@/*" -> "./src/*"
    ├── package.json              # NPM scripts and production dependencies
    ├── prisma/
    │   └── schema.prisma         # Relational database schema
    ├── public/
    │   └── assets/
    │       ├── hero-portal.png   # Cinematic background portal image
    │       ├── image 20.svg      # Club vector logo
    │       └── menu.png          # Mobile drawer toggle icon
    └── src/
        ├── middleware.js         # Edge NextAuth authorization middleware
        ├── lib/
        │   ├── auth.js           # Central NextAuth configuration & callbacks
        │   └── prisma.js         # PrismaClient singleton (prevents connection leaks)
        └── app/
            ├── layout.js         # Root HTML, SEO metadata, & AuthProvider wrapper
            ├── page.js           # Dynamic landing page
            ├── actions/
            │   ├── adminActions.js # Mutations: createTournament, updateMatchScore, updateGamerTag
            │   └── contact.js      # Mutation: sendContactEmail with Zod verification
            ├── api/
            │   └── auth/
            │       └── [...nextauth]/route.js # NextAuth HTTP handler
            ├── Components/
            │   ├── AuthProvider.js # Client wrapper for NextAuth SessionProvider
            │   ├── Hero.js         # Server Component: Auth-aware hero with portal art
            │   ├── MatchesSpotlight.js # Server Component: Live & upcoming match cards
            │   ├── NewsFeed.js     # Server Component: Latest announcements feed
            │   ├── Navbar/         # Responsive navigation header
            │   └── Footer.js       # Sponsors, quick links, and social links
            ├── events/
            │   ├── page.js         # Browse tournaments by status (Upcoming / Completed)
            │   └── [id]/
            │       ├── page.js     # Tournament fixture brackets
            │       └── RegisterTeamButton.js # Client component for team registration modal
            ├── teams/page.js       # Official rosters, team cards, and player IGNs
            ├── media/page.js       # 1080p stream embed + masonry LAN photo gallery
            ├── about/page.js       # History, mission, milestones, and executive committee
            ├── contact/page.js     # React Hook Form + Zod inquiry dispatch
            ├── login/page.js       # Custom glassmorphism OAuth login page
            ├── dashboard/
            │   ├── page.js         # Protected player portal (roster, matches, identity)
            │   └── EditProfileModal.js # Client modal for updating player gamerTag
            └── admin/
                ├── layout.js       # Admin sidebar & strict Server Component role check
                ├── page.js         # Real-time telemetry, stats, and tournament list
                └── CreateTournamentForm.js # Client component invoking createTournament
```

---

## 4. Database Schema & Data Models

Defined in **`frontend/prisma/schema.prisma`**:

### Enums
- **`Role`**: `USER`, `ADMIN` (Used for Role-Based Access Control).
- **`TournamentStatus`**: `UPCOMING`, `ONGOING`, `COMPLETED`.

### Models & Relations
1. **`User`**:
   - Fields: `id`, `name`, `email`, `emailVerified`, `image`, `gamerTag` (unique IGN), `discordId` (unique), `role` (`Role`, default `USER`).
   - Relations:
     - `accounts`: NextAuth OAuth accounts (`Account[]`).
     - `sessions`: NextAuth sessions (`Session[]`).
     - `captainOf`: Teams where this user is captain (`Team[] @relation("TeamCaptain")`).
     - `team`: Team this user belongs to (`Team? @relation("TeamMembers")`).
     - `announcements`: Dispatches authored by this user (`Announcement[]`).

2. **`Account` & `Session` & `VerificationToken`**:
   - Standard NextAuth models storing OAuth tokens (`refresh_token`, `access_token`, `id_token`).

3. **`Team`**:
   - Fields: `id`, `name` (unique), `captainId`, timestamps.
   - Relations:
     - `captain`: Captain user relation (`User`).
     - `members`: Roster players (`User[]`).
     - `matchesAsA` & `matchesAsB`: Matches where team participates (`Match[]`).

4. **`Tournament`**:
   - Fields: `id`, `title`, `gameTitle` (e.g. Valorant, BGMI, CS2), `startDate`, `endDate`, `format` (e.g. Single Elimination, Double Elimination), `status` (`TournamentStatus`), timestamps.
   - Relations:
     - `matches`: Scheduled fixtures in this tournament (`Match[]`).

5. **`Match`**:
   - Fields: `id`, `tournamentId`, `teamA_Id`, `teamB_Id`, `score` (e.g. "13-9"), `scheduledTime`, timestamps.
   - Relations:
     - `tournament`: Parent tournament (`Tournament`).
     - `teamA` & `teamB`: Competing teams (`Team`).

6. **`Announcement`**:
   - Fields: `id`, `title`, `content` (Text), `date` (DateTime default now), `authorId`, timestamps.
   - Relations:
     - `author`: Admin user who published the post (`User`).

---

## 5. Authentication, JWT & Access Control (RBAC)

### Central Auth File: `src/lib/auth.js`
- **Session Strategy**: `strategy: "jwt"` (stores session token in secure cookies, eliminating DB calls on each request).
- **Providers**: Google OAuth (`GoogleProvider`) and Discord OAuth (`DiscordProvider`).
- **Callbacks**:
  - `jwt`: Injects `user.id`, `user.role`, `user.gamerTag`, and `user.discordId` into the JWT token.
  - `session`: Copies token fields onto `session.user` so Client and Server Components have access to `session.user.role` and `session.user.gamerTag`.
  - Supports client session updates (`update({ gamerTag })`).

### Route Protection: `src/middleware.js`
- Uses NextAuth's `withAuth` middleware wrapper:
  - **`/dashboard/:path*`**: Requires valid authenticated token (`!!token`). Unauthenticated users are redirected to `/login`.
  - **`/admin/:path*`**: Requires valid token AND `token.role === "ADMIN"`. Non-admin users are immediately redirected to the homepage (`/`).

### Server Component Defense-in-Depth
- `src/app/admin/layout.js` performs an additional server-side check with `getServerSession(authOptions)`:
  ```javascript
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/");
  }
  ```

---

## 6. Server Actions & Mutations

Located in `src/app/actions/`:

1. **`adminActions.js`** (`"use server"`):
   - **`createTournament(formData)`**:
     - Enforces `verifyAdminSession()`.
     - Extracts fields, creates record in Prisma, and triggers `revalidatePath("/admin")`, `revalidatePath("/events")`, and `revalidatePath("/")`.
   - **`updateMatchScore(matchId, score)`**:
     - Enforces `verifyAdminSession()`.
     - Updates match score in Prisma and triggers `revalidatePath`.
   - **`updateGamerTag(gamerTag)`**:
     - Verifies session for logged-in player.
     - Updates `user.gamerTag` and revalidates `/dashboard` and `/teams`.

2. **`contact.js`** (`"use server"`):
   - **`sendContactEmail(data)`**:
     - Server-side validation using `contactSchema` (Zod).
     - Hook for email delivery services (Resend / Nodemailer).

---

## 7. Data Resilience & Graceful Fallbacks

To ensure smooth local development before a PostgreSQL database is initialized:
- All database queries in public Server Components (`MatchesSpotlight.js`, `NewsFeed.js`, `events/page.js`, `teams/page.js`, `events/[id]/page.js`) are wrapped in `try...catch` blocks.
- If the database is unreachable, components automatically render clean empty states (e.g. *"No upcoming matches scheduled at the moment"*, *"Past tournament archives will appear here"*) rather than crashing SSR rendering.

---

## 8. Development & Tooling Conventions

1. **Path Imports**: Always use `@/...` to reference `src/...` (e.g., `@/lib/auth`, `@/lib/prisma`, `@/app/Components/...`).
2. **Configuration Priority**: Do **not** re-add an empty `tsconfig.json` unless migrating the entire project to TypeScript; the project is configured for pure JavaScript with `jsconfig.json`.
3. **Execution Policies on Windows**:
   - If Windows PowerShell prevents running scripts, execute via `.cmd` wrappers:
     - `npx.cmd prisma generate`
     - `npm.cmd run dev`
4. **Environment Variables**:
   - Local overrides go into `frontend/.env.local`.
   - Always commit template changes to `frontend/.env.example`.
5. **Security**:
   - RSA `.pem` keys, `.env` files, and credentials are strictly ignored in `.gitignore`. Never commit keys to version control.
