"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

import { TrackPreference } from "@/components/track-preference";
import { isValidEmail } from "@/lib/waitlist";

type CaptureState = "idle" | "submitting" | "success" | "error";

export function WaitlistCapture() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<CaptureState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittedEmailRef = useRef<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const submitEmail = useCallback(async (value: string) => {
    const trimmed = value.trim().toLowerCase();

    if (!isValidEmail(trimmed)) {
      return;
    }

    if (submittedEmailRef.current === trimmed) {
      setState("success");
      return;
    }

    setState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error ?? "Unable to join waitlist. Please try again.");
        setState("error");
        return;
      }

      submittedEmailRef.current = trimmed;
      setEmail(trimmed);
      setState("success");
    } catch {
      setErrorMessage("Unable to join waitlist. Please try again.");
      setState("error");
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (state === "success" || state === "submitting") {
      return;
    }

    if (!isValidEmail(email)) {
      return;
    }

    debounceRef.current = setTimeout(() => {
      void submitEmail(email);
    }, 600);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [email, state, submitEmail]);

  const handleBlur = () => {
    if (isValidEmail(email) && state !== "success" && state !== "submitting") {
      void submitEmail(email);
    }
  };

  return (
    <section id="waitlist" className="px-6 lg:px-12 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
            Early access
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            Get early access
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Drop your email. We&apos;ll save your spot automatically — no button
            required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="relative">
            <input
              id="waitlist-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") {
                  setState("idle");
                  setErrorMessage("");
                }
              }}
              onBlur={handleBlur}
              placeholder="you@example.com"
              disabled={state === "submitting" || state === "success"}
              autoComplete="email"
              className="w-full px-5 py-4 pr-14 text-base bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <AnimatePresence mode="wait">
                {state === "submitting" && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </motion.span>
                )}
                {state === "success" && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Check className="w-5 h-5 text-green-600" />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
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
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 text-sm text-green-600"
              >
                You&apos;re on the list. We&apos;ll be in touch soon.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {state === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8"
            >
              <TrackPreference email={email} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          No spam. Unsubscribe anytime. We respect your privacy.
        </motion.p>
      </div>
    </section>
  );
}
