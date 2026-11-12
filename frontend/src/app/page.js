import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero";
import MatchesSpotlight from "./Components/MatchesSpotlight";
import NewsFeed from "./Components/NewsFeed";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Auth-Aware Hero Section */}
      <Hero />

      {/* Stylized Esports Neon Divider */}
      <div className="w-full relative bg-gradient-to-r from-transparent via-[#ec3661] to-transparent h-[2px]" />

      {/* Ongoing & Upcoming Matches */}
      <MatchesSpotlight />

      {/* Announcements & Club News */}
      <NewsFeed />

      {/* Global Footer & Sponsors */}
      <Footer />
    </main>
  );
}
