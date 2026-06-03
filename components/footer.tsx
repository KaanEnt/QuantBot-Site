"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="px-6 lg:px-12 py-12 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-xs">Q</span>
            </div>
            <span className="font-bold text-foreground tracking-tight">
              QuantBot
            </span>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} QuantBot. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
