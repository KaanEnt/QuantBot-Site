"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Loader2,
  BookOpen,
  Code,
  Cpu,
  TrendingUp,
} from "lucide-react";

type Track = "agentic-teacher" | "quant-teacher" | null;
type FormState = "idle" | "loading" | "success" | "error";

const tracks = {
  "agentic-teacher": {
    title: "The Agentic Teacher",
    subtitle: "For builders, engineers, and deep learners",
    description:
      "Turn any complex subject into a custom-built, interactive curriculum with a parallel research adapter layer that validates knowledge depth.",
    icon: Cpu,
    color: "bg-accent",
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
    color: "bg-foreground",
    features: [
      "Live market data testing",
      "Python runtime execution",
      "Alpha strategy development",
    ],
  },
};

export function TrackSelector() {
  const [selectedTrack, setSelectedTrack] = useState<Track>(null);
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setState("success");
    setEmail("");
  };

  const resetForm = () => {
    setSelectedTrack(null);
    setState("idle");
    setEmail("");
    setErrorMessage("");
  };

  return (
    <section id="tracks" className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
            Choose Your Path
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            Two tracks. One destination.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Select the learning experience that matches your goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {(Object.keys(tracks) as Array<keyof typeof tracks>).map(
            (trackKey, index) => {
              const track = tracks[trackKey];
              const Icon = track.icon;
              const isSelected = selectedTrack === trackKey;

              return (
                <motion.div
                  key={trackKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <motion.button
                    onClick={() => {
                      if (state !== "success") {
                        setSelectedTrack(isSelected ? null : trackKey);
                        setState("idle");
                        setErrorMessage("");
                      }
                    }}
                    whileHover={{ scale: state !== "success" ? 1.02 : 1 }}
                    whileTap={{ scale: state !== "success" ? 0.98 : 1 }}
                    className={`w-full text-left p-8 lg:p-10 rounded-3xl border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-accent bg-accent/5 shadow-xl"
                        : "border-border bg-card hover:border-accent/50 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`p-3 rounded-2xl ${
                          trackKey === "agentic-teacher"
                            ? "bg-accent text-accent-foreground"
                            : "bg-foreground text-background"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isSelected ? 1 : 0,
                          opacity: isSelected ? 1 : 0,
                        }}
                        className="p-2 rounded-full bg-accent"
                      >
                        <Check className="w-4 h-4 text-accent-foreground" />
                      </motion.div>
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

                    {/* Email form slides in when selected */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="pt-8 mt-8 border-t border-border">
                            <form onSubmit={handleSubmit}>
                              <div className="flex flex-col gap-3">
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (state === "error") setState("idle");
                                  }}
                                  placeholder="Enter your email"
                                  disabled={
                                    state === "loading" || state === "success"
                                  }
                                  className="w-full px-5 py-4 text-base bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <motion.button
                                  type="submit"
                                  disabled={
                                    state === "loading" || state === "success"
                                  }
                                  whileHover={{
                                    scale: state === "idle" ? 1.02 : 1,
                                  }}
                                  whileTap={{
                                    scale: state === "idle" ? 0.98 : 1,
                                  }}
                                  className={`group w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-base transition-all disabled:cursor-not-allowed ${
                                    trackKey === "agentic-teacher"
                                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                                      : "bg-foreground text-background hover:bg-foreground/90"
                                  }`}
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
                                        You&apos;re on the list!
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
                                        Join {track.title.split(" ").pop()} waitlist
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
                                    className="mt-3 text-sm text-red-600"
                                  >
                                    {errorMessage}
                                  </motion.p>
                                )}
                                {state === "success" && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mt-3"
                                  >
                                    <p className="text-sm text-green-600 mb-2">
                                      Thanks for joining! We&apos;ll be in touch soon.
                                    </p>
                                    <button
                                      type="button"
                                      onClick={resetForm}
                                      className="text-sm text-muted-foreground underline hover:text-foreground"
                                    >
                                      Select a different track
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </form>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              );
            }
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          No spam. Unsubscribe anytime. We respect your privacy.
        </motion.p>
      </div>
    </section>
  );
}
