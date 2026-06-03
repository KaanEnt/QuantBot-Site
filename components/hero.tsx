"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative px-6 lg:px-12 pt-32 pb-24 lg:pt-40 lg:pb-32">
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
          className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.95] max-w-4xl text-balance"
        >
          Your personal
          <br />
          quant teacher
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Two powerful modes. One intelligent system. Learn complex financial
          concepts with our Teacher mode, then build and test trading algorithms
          with our Implementer. All backed by a living knowledge base and
          parallel research adapters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-lg">
            Open library
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-foreground rounded-xl font-medium text-lg border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-200">
            Open chat
          </button>
        </motion.div>
      </div>
    </section>
  );
}
