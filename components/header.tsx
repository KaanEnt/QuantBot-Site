"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4"
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">Q</span>
          </div>
          <span className="font-bold text-xl text-foreground tracking-tight">
            QuantBot
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#how-it-works"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            How it works
          </Link>
          <Link
            href="#waitlist"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            Waitlist
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors">
            Sign in
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors">
            Get started
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
