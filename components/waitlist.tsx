"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      setState("error");
      return;
    }

    setState("loading");

    // Simulate API call - replace with actual Supabase integration
    // To enable Supabase, add the integration and uncomment below:
    /*
    import { createClient } from '@supabase/supabase-js'
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, created_at: new Date().toISOString() }])
    
    if (error) {
      setState("error")
      setErrorMessage("Something went wrong. Please try again.")
      return
    }
    */

    // Simulated success after delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setState("success");
    setEmail("");
  };

  return (
    <section className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
            Early Access
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            Join the Waitlist
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Be among the first to experience QuantBot. We&apos;re opening access
            to a limited group of early adopters.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-12"
        >
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  placeholder="Enter your email"
                  disabled={state === "loading" || state === "success"}
                  className="w-full px-6 py-5 text-lg bg-card border-2 border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <motion.button
                type="submit"
                disabled={state === "loading" || state === "success"}
                whileHover={{ scale: state === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: state === "idle" ? 0.98 : 1 }}
                className="group inline-flex items-center justify-center gap-2 px-8 py-5 bg-primary text-primary-foreground rounded-2xl font-medium text-lg hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed sm:w-auto w-full"
              >
                <AnimatePresence mode="wait">
                  {state === "loading" && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Joining...
                    </motion.span>
                  )}
                  {state === "success" && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      You&apos;re in!
                    </motion.span>
                  )}
                  {(state === "idle" || state === "error") && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Get early access
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            <AnimatePresence>
              {state === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute mt-3 text-sm text-red-600"
                >
                  {errorMessage}
                </motion.p>
              )}
              {state === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute mt-3 text-sm text-green-600"
                >
                  Thanks for joining! We&apos;ll be in touch soon.
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            No spam. Unsubscribe anytime. We respect your privacy.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
