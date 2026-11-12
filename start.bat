@echo off
title IITR Esports Website - Dev Server
color 0b

echo =======================================================
echo          IITR ESPORTS - LAUNCHING PLATFORM            
echo =======================================================
echo.

cd /d "%~dp0frontend"

if not exist ".env.local" (
    echo [*] Creating .env.local configuration...
    copy .env.example .env.local >nul
)

echo [*] Verifying Prisma Client...
call npx prisma generate

echo.
echo [*] Starting Next.js Development Server at http://localhost:3000 ...
echo [*] Launching your browser in 3 seconds...

start http://localhost:3000

call npm run dev

pause

