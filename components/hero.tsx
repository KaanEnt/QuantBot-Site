"use client";

import { motion } from "framer-motion";

import { WaitlistInlineForm } from "@/components/waitlist-inline-form";

export function Hero() {
  return (
    <section className="relative px-6 lg:px-12 pt-24 pb-16 lg:pt-28 lg:pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.95] max-w-5xl text-balance"
        >
          Don&apos;t wait for the polished version.
          <br />
          <span className="text-accent">Build the tool you need to learn it.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          QuantBot is a personal learning engine. Give it a topic—like running
          real-time backtests on $TSLA data—and watch it spin up full courses,
          markdown briefs, and runnable execution files in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-12 lg:mt-14"
        >
          <WaitlistInlineForm variant="hero" />
        </motion.div>
      </div>
    </section>
  );
}
