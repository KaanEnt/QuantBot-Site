"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

import { TrackPreference } from "@/components/track-preference";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { useWaitlistEmail } from "@/hooks/use-waitlist-email";
import { cn } from "@/lib/utils";

type WaitlistInlineFormProps = {
  variant?: "hero" | "compact";
  className?: string;
};

export function WaitlistInlineForm({
  variant = "hero",
  className,
}: WaitlistInlineFormProps) {
  const {
    email,
    state,
    errorMessage,
    handleBlur,
    handleChange,
    handleSubmit,
    isDisabled,
  } = useWaitlistEmail();

  const isHero = variant === "hero";

  return (
    <div id="waitlist" className={cn("w-full", className)}>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={cn(
          "flex w-full flex-col overflow-hidden rounded-2xl border-2 border-border bg-card transition-all sm:h-14 sm:flex-row sm:items-stretch",
          "focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10",
          isHero
            ? "max-w-2xl shadow-[0_8px_30px_rgba(17,17,17,0.06)]"
            : "max-w-xl",
          isDisabled && "opacity-60",
        )}
      >
        <div className="relative flex min-h-14 min-w-0 flex-1 items-center border-b border-border sm:border-b-0 sm:border-r">
          <input
            id="waitlist-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            placeholder="you@example.com"
            disabled={isDisabled}
            autoComplete="email"
            className={cn(
              "h-14 w-full min-w-0 bg-transparent text-foreground placeholder:text-muted-foreground",
              "focus:outline-none disabled:cursor-not-allowed",
              isHero ? "px-5 text-base sm:text-[17px]" : "px-4 text-sm",
              "pr-12",
            )}
          />
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              {state === "submitting" && (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </motion.span>
              )}
              {state === "success" && (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Check className="h-5 w-5 text-green-600" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <GetStartedButton
          type="submit"
          layout="inline"
          disabled={isDisabled}
          className="w-full sm:w-auto"
        >
          Join the waitlist
        </GetStartedButton>
      </form>

      {isHero && (
        <p className="mt-3 text-sm text-muted-foreground">
          No spam. Unsubscribe anytime.
        </p>
      )}

      <AnimatePresence>
        {state === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-3 text-sm text-red-600"
          >
            {errorMessage}
          </motion.p>
        )}
        {state === "success" && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-3 text-sm text-green-600"
          >
            You&apos;re on the list. We&apos;ll be in touch soon.
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6"
          >
            <TrackPreference email={email} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
