import { Footer } from "@/components/footer";
import { Features } from "@/components/features";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { TrackSelector } from "@/components/track-selector";

export default function Home() {
  return (
    <main className="flex-1">
      <Header />
      <Hero />
      <TrackSelector />
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <Features />
      <Footer />
    </main>
  );
}
