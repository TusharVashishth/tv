import { Hero } from "@/components/features/landing/Hero";
import { Skills } from "@/components/features/landing/Skills";
import { YouTube } from "@/components/features/landing/YouTube";
import { Projects } from "@/components/features/landing/Projects";
import { Footer } from "@/components/features/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Hero />
      <Skills />
      <YouTube />
      <Projects />
      <Footer />
    </main>
  );
}
