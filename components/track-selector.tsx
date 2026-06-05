"use client";

import { motion } from "framer-motion";
import { Cpu, TrendingUp } from "lucide-react";

import { WaitlistCapture } from "@/components/waitlist-capture";

const tracks = {
  "agentic-teacher": {
    title: "The Agentic Teacher",
    subtitle: "For builders, engineers, and deep learners",
    description:
      "Turn any complex subject into a custom-built, interactive curriculum with a parallel research adapter layer that validates knowledge depth.",
    icon: Cpu,
    accent: true,
    features: [
      "Custom curriculum generation",
      "Research adapter validation",
      "Interactive knowledge base",
    ],
  },
  "quant-teacher": {
    title: "The Quant Teacher",
    subtitle: "For quants, traders, and fintech enthusiasts",
    description:
      "Master alphas, market cycles, crashes, and regulation, backed by a direct Python runtime testing against live market data.",
    icon: TrendingUp,
    accent: false,
    features: [
      "Live market data testing",
      "Python runtime execution",
      "Alpha strategy development",
    ],
  },
};

export function TrackSelector() {
  return (
    <>
      <WaitlistCapture />

      <section className="px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border mb-6">
              Two tracks
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight text-balance">
              Two tracks. One destination.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              QuantBot adapts to how you learn. Explore both paths below.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {(Object.keys(tracks) as Array<keyof typeof tracks>).map(
              (trackKey, index) => {
                const track = tracks[trackKey];
                const Icon = track.icon;

                return (
                  <motion.div
                    key={trackKey}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-8 lg:p-10 rounded-3xl border-2 border-border bg-card"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`p-3 rounded-2xl ${
                          track.accent
                            ? "bg-accent text-accent-foreground"
                            : "bg-foreground text-background"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                      {track.title}
                    </h3>
                    <p className="text-sm text-accent font-medium mb-4">
                      {track.subtitle}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {track.description}
                    </p>

                    <ul className="space-y-2">
                      {track.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              },
            )}
          </div>
        </div>
      </section>
    </>
  );
}
