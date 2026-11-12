import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <div className="w-full relative bg-[#ec3661] h-[0.2rem]" />
    </>
  );
}