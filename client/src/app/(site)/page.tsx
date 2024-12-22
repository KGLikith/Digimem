import GridSection from "@/components/main/GridSection";
import Hero from "@/components/main/Hero";

export default function Home() {
  return (
    <>
      <div>
        <Hero />
        <GridSection />
        <div className="h-screen"></div>
        <div className="h-screen"></div>
      </div>
    </>
  );
}
