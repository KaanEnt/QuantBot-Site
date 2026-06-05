"use client";

import { motion } from "framer-motion";

import { GetStartedButton } from "@/components/ui/get-started-button";
import { scrollToWaitlist } from "@/lib/waitlist";

export function Hero() {
  return (
    <section className="relative px-6 lg:px-12 pt-24 pb-16 lg:pt-28 lg:pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">
            quantitative finance
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border">
            agentic AI
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border">
            Python runtime
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.95] max-w-5xl text-balance"
        >
          Stop waiting for the polished version.
          <br />
          <span className="text-accent">Build the tool you need to learn it.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          QuantBot is a personal learning engine. Give it a topic—like running
          real-time backtests on $TSLA data—and watch it spin up full courses,
          markdown briefs, and runnable execution files in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <GetStartedButton onClick={scrollToWaitlist}>
            Join the waitlist
          </GetStartedButton>
        </motion.div>
      </div>
    </section>
  );
}
