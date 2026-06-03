import {
  Header,
  Hero,
  HowItWorks,
  Features,
  Waitlist,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <main className="flex-1">
      <Header />
      <Hero />
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <Features />
      <section id="waitlist">
        <Waitlist />
      </section>
      <Footer />
    </main>
  );
}
