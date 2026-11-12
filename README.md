# 🎮 IITR Esports Club — Official Competitive Gaming Platform

![Next.js 14](https://img.shields.io/badge/Next.js-14.1.0-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma ORM](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=for-the-badge&logo=postgresql)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v4-purple?style=for-the-badge&logo=auth0)

The official collegiate gaming portal for **IIT Roorkee Esports Club**. Built with high-performance **Next.js 14 App Router**, **Prisma ORM**, **PostgreSQL**, **Tailwind CSS**, and **NextAuth.js**, featuring live bracket tracking, team roster management, tournament registrations, player profiles, and a secured administrative command center.

---

## ⚡ Quick Start (One-Click)

### Windows
Double-click the **`start.bat`** file in the root folder, or run:
```bat
start.bat
```
This launcher automatically checks environment configurations, verifies Prisma client generation, launches your default browser, and starts the Next.js development server at **`http://localhost:3000`**.

---

## 🚀 Manual Installation & Setup

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+
- **PostgreSQL**: Local instance or hosted (Supabase, Neon, Railway)

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/Vunknow37/esports-website.git
cd "esports-website/frontend"
npm install
```

### 3. Configure Environment Variables
Copy the template in `frontend/.env.example` to `frontend/.env.local`:
```bash
cp .env.example .env.local
```

Fill in your configuration:
```env
# Database connection string
DATABASE_URL="postgresql://username:password@localhost:5432/esports_site?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars"

# OAuth Providers
GOOGLE_ID="your-google-oauth-client-id"
GOOGLEAUTH_SECRET="your-google-oauth-client-secret"

DISCORD_CLIENT_ID="your-discord-client-id"
DISCORD_CLIENT_SECRET="your-discord-client-secret"
```

### 4. Initialize Database with Prisma
```bash
# Push the Prisma schema directly to PostgreSQL
npx prisma db push

# Generate Prisma Client types
npx prisma generate
```

### 5. Launch the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📂 Project Architecture

```text
esports-website/
├── start.bat                           # One-click Windows development launcher
├── README.md                           # Main documentation & getting started
├── CONTEXT.md                          # Full architectural & technical specifications
├── .gitignore                          # Security rules (ignores keys, .pem, .env)
└── frontend/
    ├── prisma/
    │   └── schema.prisma               # Relational PostgreSQL & NextAuth schema
    ├── public/
    │   └── assets/
    │       ├── hero-portal.png         # Cinematic portal background artwork
    │       ├── image 20.svg            # Official IITR Esports vector logo
    │       └── menu.png                # Mobile hamburger menu icon
    ├── src/
    │   ├── middleware.js               # Route protection & role-based middleware
    │   ├── lib/
    │   │   ├── auth.js                 # Centralized NextAuth config (JWT & RBAC)
    │   │   └── prisma.js               # Global Prisma Client singleton
    │   └── app/
    │       ├── actions/
    │       │   ├── adminActions.js     # Next.js 14 Server Actions (Tournaments, Matches)
    │       │   └── contact.js          # Zod validation & contact form Server Action
    │       ├── api/auth/[...nextauth]/ # OAuth authentication handlers
    │       ├── Components/
    │       │   ├── AuthProvider.js     # SessionProvider context wrapper
    │       │   ├── Hero.js             # Dynamic, auth-aware hero banner
    │       │   ├── MatchesSpotlight.js # Live/upcoming match fixtures Server Component
    │       │   ├── NewsFeed.js         # Latest announcements Server Component
    │       │   ├── Navbar/             # Responsive desktop/mobile navbar
    │       │   └── Footer.js           # Sponsor grid, quick links, & socials
    │       ├── events/
    │       │   ├── page.js             # Tournaments catalog (Upcoming & Completed)
    │       │   └── [id]/               # Bracket details & interactive registration
    │       ├── teams/page.js           # Official rosters & in-game names (IGNs)
    │       ├── media/page.js           # Live stream broadcast & LAN photo gallery
    │       ├── about/page.js           # Mission, history, stats, & executive committee
    │       ├── contact/page.js         # React Hook Form + Zod contact portal
    │       ├── login/page.js           # Glassmorphism Discord & Google sign-in
    │       ├── dashboard/page.js       # Protected player portal & IGN editor
    │       └── admin/                  # Protected admin console & telemetry
```

---

## 🛡️ Route Access Matrix

| Route | Access Level | Description |
| :--- | :--- | :--- |
| **`/`** | **Public** | Dynamic landing page with auth-aware Hero, live match spotlight, and news feed. |
| **`/events`** | **Public** | Browsable tournament schedule categorized by status (Upcoming, Ongoing, Completed). |
| **`/events/[id]`** | **Public / Auth** | Tournament fixtures, match scores, and interactive team registration button. |
| **`/teams`** | **Public** | Official roster directory with captains and in-game names (IGNs). |
| **`/media`** | **Public** | Live stream broadcast player and masonry-style LAN photography gallery. |
| **`/about`** | **Public** | Club history, mission statement, milestone stats, and executive committee. |
| **`/contact`** | **Public** | Inquiry form with client-side Zod validation and server-side email dispatch. |
| **`/login`** | **Public** | Gaming-themed OAuth login portal (Discord & Google). |
| **`/dashboard`** | 🔒 **Player Session** | Personal player portal: avatar, IGN customizer, team roster, and match calendar. |
| **`/admin`** | 🛡️ **Admin Only** | Protected console for tournament creation, match score editing, and telemetry. |

---

## 🛠️ Key Technologies & Features

- **Next.js 14 App Router**: Server Components by default for optimal SEO, zero Client-Side Layout Shift (CLS), and instant static/dynamic streaming.
- **Prisma & PostgreSQL**: Full relational schema managing Users, Teams, Tournaments, Matches, Announcements, and NextAuth sessions.
- **NextAuth.js v4 (JWT & RBAC)**: Role-Based Access Control supporting `USER` and `ADMIN` roles persisted in tokens and sessions.
- **Edge Middleware**: Next.js route protection preventing unauthorized access to player and administrative sections.
- **Server Actions**: Mutations (`createTournament`, `updateMatchScore`, `sendContactEmail`, `updateGamerTag`) with path revalidation (`revalidatePath`).
- **Form Validation**: `react-hook-form` paired with `@hookform/resolvers/zod` for dual client/server validation.

---

## 📜 License
Distributed under the MIT License. Built with pride for **IIT Roorkee Esports Club**.
