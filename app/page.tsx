import {
  Header,
  Hero,
  HowItWorks,
  Features,
  TrackSelector,
  Footer,
} from "@/components";

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
