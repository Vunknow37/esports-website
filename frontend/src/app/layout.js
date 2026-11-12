import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./Components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IITR Esports Club | Official Competitive Gaming Portal",
  description:
    "Official collegiate esports platform for IIT Roorkee. Register for tournaments, organize scrims, track teams, and follow live match brackets across Valorant, BGMI, CS2, and more.",
  keywords: [
    "Esports",
    "IIT Roorkee Esports",
    "Competitive Gaming",
    "Valorant Tournaments",
    "BGMI Championships",
    "College Gaming Club",
    "Gaming Tournaments",
    "Esports Teams",
  ],
  authors: [{ name: "IITR Esports Club" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-zinc-950 text-white antialiased selection:bg-purple-600 selection:text-white`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
