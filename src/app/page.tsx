import { Hero } from "@/components/features/hero/Hero";
import { Skills } from "@/components/features/skills/Skills";
import { YouTube } from "@/components/features/youtube/YouTube";
import { Projects } from "@/components/features/projects/Projects";
import { Footer } from "@/components/features/footer/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-[#eef4ff] overflow-hidden">
      <Hero />
      <Skills />
      <YouTube />
      <Projects />
      <Footer />
    </main>
  );
}
