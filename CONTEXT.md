# 📘 CONTEXT.md — Project Technical & Architectural Reference

> 📌 **CANONICAL GOLDEN CHECKPOINT**:
> **Commit `a0c2828` (`host on private`) is the official user-approved Golden Checkpoint for this project.**  
> If the user ever instructs to *"revert completely back"*, immediately restore both local and remote environments to this exact state.

---

## 1. Project Overview & Vision
- **Organization**: IIT Roorkee Esports Club.
- **Goal**: Provide a competitive collegiate gaming portal for hosting tournaments, managing team rosters, publishing match schedules, streaming LAN events, and handling administrative bracket operations.
- **Target Games**: Valorant, BGMI, Counter-Strike 2 (CS2), Dota 2, and other competitive esports titles.

### 1.1 Strict Project Operational Rules
- **GIT CONSTRAINT (ABSOLUTE)**: **NEVER run `git push` or `git pull`**. The user explicitly mandated: *"i should be the one to push and pull you should never do it"*. All changes must remain strictly local or directly deployed to the server via SSH/SCP.
- **Golden Checkpoint Baseline**: Any UI changes or extensions must build upon and respect the layout established in commit `a0c2828`.

---

## 2. Core Technical Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `14.1.0` | React Server Components, Server Actions, streaming, dynamic routing |
| **Language** | JavaScript (ESNext) | — | Pure JS with `jsconfig.json` module path resolution (`@/*`) |
| **Styling** | Tailwind CSS | `3.3.0` | Dark gaming theme, custom gradients, responsive grid |
| **Database** | PostgreSQL | `14+` | Production relational database running locally on AWS EC2 |
| **ORM** | Prisma ORM | `5.22.0` | Type-safe schema modeling, queries, and seeding |
| **Auth** | NextAuth.js | `4.24.5` | OAuth (Google & Discord), JWT session strategy, RBAC |
| **Auth Adapter**| `@next-auth/prisma-adapter` | `1.0.7` | Syncs OAuth accounts and sessions to PostgreSQL |
| **Validation** | Zod | `3.23.8` | Schema validation on client and server |
| **Forms** | React Hook Form | `7.x` | High-performance uncontrolled form handling with Zod resolvers |
| **Daemon / Process**| PM2 | `5.x+` | 24/7 background process management and auto-boot recovery |
| **Reverse Proxy** | Nginx | `1.24+` | Reverse proxy on ports 80 and 443 with WebSocket support |

---

## 3. Directory Layout & Module Aliasing

The module alias `@/*` maps directly to `frontend/src/*` via **`frontend/jsconfig.json`**:

```text
e:\coding\esports\main website\
├── start.bat                     # Windows one-click local launcher
├── README.md                     # High-level overview & setup
├── CONTEXT.md                    # Technical reference document (this file)
├── .gitignore                    # Root gitignore (RSA keys, certs, .env)
└── frontend/
    ├── jsconfig.json             # Root path aliasing: "@/*" -> "./src/*"
    ├── package.json              # NPM scripts and production dependencies
    ├── prisma/
    │   ├── schema.prisma         # Relational database schema
    │   └── seed.js               # Database seeding script (admin, teams, tournaments)
    ├── public/
    │   └── assets/
    │       ├── heroBG.png        # Hero background asset
    │       ├── image 20.svg      # Club vector logo
    │       └── menu.png          # Mobile drawer toggle icon
    └── src/
        ├── middleware.js         # Edge NextAuth authorization middleware
        ├── lib/
        │   ├── auth.js           # Central NextAuth configuration & callbacks
        │   └── prisma.js         # PrismaClient singleton (prevents connection leaks)
        └── app/
            ├── layout.js         # Root HTML, SEO metadata, & AuthProvider wrapper
            ├── page.js           # Landing page (Navbar, Hero, MatchesSpotlight, NewsFeed, Footer)
            ├── actions/
            │   ├── adminActions.js # Mutations: createTournament, updateMatchScore, updateGamerTag
            │   ├── tournamentActions.js # Team registration mutation
            │   └── contact.js      # Mutation: sendContactEmail with Zod verification
            ├── api/
            │   └── auth/
            │       └── [...nextauth]/route.js # NextAuth HTTP handler
            ├── Components/
            │   ├── AuthProvider.js # Client wrapper for NextAuth SessionProvider + Toaster
            │   ├── Button.js       # Action button component
            │   ├── Footer.js       # Global footer with sponsors and links
            │   ├── Hero.js         # Auth-aware Hero component
            │   ├── MatchesSpotlight.js # Live and scheduled matches spotlight
            │   ├── NewsFeed.js     # Club announcements and updates feed
            │   ├── SignOutButton.js # Client logout button
            │   ├── Hero/
            │   │   ├── Hero.js     # Component reference
            │   │   └── Hero.css    # .playtime gradient and .HeroBg
            │   └── Navbar/
            │       ├── Navbar.js   # Navigation header with auth state
            │       └── Navbar.css  # .navlinkStyle hover effect
            ├── events/
            │   ├── page.js         # Tournament schedule catalog
            │   └── [id]/
            │       ├── page.js     # Tournament fixture brackets
            │       └── RegisterTeamButton.js # Team registration modal
            ├── teams/page.js       # Official rosters and player IGNs
            ├── media/page.js       # 1080p stream embed + masonry LAN photo gallery
            ├── about/page.js       # History, mission, milestones, and executive committee
            ├── contact/page.js     # React Hook Form + Zod inquiry dispatch
            ├── login/page.js       # Glassmorphism OAuth login page
            ├── dashboard/
            │   ├── page.js         # Protected player portal (roster, matches, identity)
            │   └── EditProfileModal.js # Modal for updating player gamerTag
            └── admin/
                ├── layout.js       # Strict Server Component role check
                ├── page.js         # Real-time telemetry, stats, and tournament list
                └── CreateTournamentForm.js # Tournament creation form
```

---

## 4. Production Server Infrastructure (AWS EC2)

- **Instance ID**: `i-0e190800e17c0e995`
- **Instance Type**: `t3a.medium` (2 vCPU, 4GB RAM, 80GB Disk)
- **Public IP**: `13.233.117.195`
- **Private IP**: `10.0.1.57`
- **Operating System**: Ubuntu 22.04 LTS
- **SSH Access**: `ubuntu@13.233.117.195` via `E-Sports-Server-keypair.pem`
- **Control Panel**: aaPanel `v8.0.7` at `http://13.233.117.195:7800/b987d99b`
- **Process Manager (PM2)**:
  - App Name: `esports-platform`
  - Internal Port: `http://127.0.0.1:3000`
  - Auto-start configured via systemd (`pm2 startup` / `pm2 save`).
- **Nginx Reverse Proxy**:
  - Configuration: `/www/server/panel/vhost/nginx/esports.conf`
  - Listens on Port 80 (HTTP) and Port 443 (HTTPS).
  - Crucial setting: `proxy_cache off;` (prevents Nginx from serving stale cached responses).
- **Database (PostgreSQL 14)**:
  - Connection: `postgresql://esports_admin:esports_secure_pass_2026@localhost:5432/esports_site?schema=public`
  - Default Admin: `admin@iitresports.com` / `AdminPassword@123`
  - Seeded Content: 3 official teams (*Roorkee Titans*, *Phoenix Syndicate*, *Apex Predators*), 3 tournaments (Valorant, BGMI, CS2), fixtures, and announcements.

---

## 5. Deployment Protocol (No Git Push)

Whenever changes are verified locally and need to be deployed to the live server:
1. Ensure `npm run build` passes with zero errors locally.
2. Package updated source files:
   ```bash
   tar --exclude="node_modules" --exclude=".next" -czf update.tar.gz src
   ```
3. Transfer to AWS EC2:
   ```bash
   scp -i E-Sports-Server-keypair.pem frontend/update.tar.gz ubuntu@13.233.117.195:/tmp/
   ```
4. Extract, rebuild, and reload PM2 on server:
   ```bash
   ssh -i E-Sports-Server-keypair.pem ubuntu@13.233.117.195 "sudo tar -xzf /tmp/update.tar.gz -C /var/www/esports-platform/ && rm -f /tmp/update.tar.gz && cd /var/www/esports-platform && npm run build && pm2 restart esports-platform"
   ```
5. Purge Nginx proxy cache if any static assets were modified:
   ```bash
   ssh -i E-Sports-Server-keypair.pem ubuntu@13.233.117.195 "sudo rm -rf /www/server/nginx/proxy_cache_dir/* && sudo nginx -s reload"
   ```

---

## 6. Mobile Optimization & Responsiveness Standards (Audit Completed)

All components, pages, and layouts have been audited and updated to be 100% responsive across devices from iPhone SE (320px) up to iPad Pro (1024px+):
- **Navbar (`components/Navbar/Navbar.js`)**: Hamburger button wrapped in accessible button with $\ge 44$px touch target; mobile drawer links with `min-h-[44px]` touch targets and auto-close on selection.
- **Hero (`components/Hero.js`)**: "PLAYTIME" headline scales `text-4xl sm:text-6xl md:text-8xl` with `break-words`; CTAs stack vertically (`flex-col sm:flex-row w-full sm:w-auto min-h-[44px]`).
- **Matches Spotlight & News (`components/MatchesSpotlight.js`, `NewsFeed.js`)**: Fluid spacing `py-12 md:py-20 px-4 sm:px-6 md:px-16` and 44px tap targets for CTAs.
- **Footer (`components/Footer.js`)**: Social icons sized at `w-11 h-11` ($\ge 44$px); 5th sponsor spans `col-span-2 sm:col-span-1` cleanly on 2-col mobile layout.
- **Grids & Dashboards (`/teams`, `/events`, `/admin`, `/dashboard`)**: CSS grids collapse to 1 column on mobile (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`); admin data table wrapped in `w-full overflow-x-auto` with `min-w-[520px]`; forms feature full-width stacked inputs with `min-h-[44px]`.
- **Media Gallery (`/media`)**: Responsive masonry without forced vertical stretch on mobile (`col-span-1 md:col-span-2 md:row-span-2`).

