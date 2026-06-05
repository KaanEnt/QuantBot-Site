"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PreferredMode } from "@/lib/waitlist";

const preferences: Array<{
  value: PreferredMode;
  label: string;
}> = [
  { value: "agentic-teacher", label: "Agentic Teacher" },
  { value: "quant-teacher", label: "Quant Teacher" },
  { value: "general", label: "Not sure yet" },
];

type TrackPreferenceProps = {
  email: string;
};

export function TrackPreference({ email }: TrackPreferenceProps) {
  const [selected, setSelected] = useState<PreferredMode | null>(null);
  const [saving, setSaving] = useState<PreferredMode | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (dismissed) {
    return null;
  }

  const savePreference = async (mode: PreferredMode) => {
    setSaving(mode);
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, preferred_mode: mode }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error ?? "Unable to save preference.");
        return;
      }

      setSelected(mode);
    } catch {
      setErrorMessage("Unable to save preference.");
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-sm font-medium text-foreground mb-1">
        Optional — which track interests you most?
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        Pick one if you want. You can skip this for now.
      </p>

      <div className="flex flex-wrap gap-2">
        {preferences.map((preference) => {
          const isSelected = selected === preference.value;
          const isSaving = saving === preference.value;

          return (
            <button
              key={preference.value}
              type="button"
              disabled={Boolean(saving) || isSelected}
              onClick={() => void savePreference(preference.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                isSelected
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground",
                saving && !isSaving && "opacity-50",
              )}
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSelected && !isSaving && <Check className="w-4 h-4 text-accent" />}
              {preference.label}
            </button>
          );
        })}
      </div>

      {errorMessage && (
        <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
      )}

      {!selected && (
        <motion.button
          type="button"
          onClick={() => setDismissed(true)}
          className="mt-4 text-sm text-muted-foreground underline hover:text-foreground"
        >
          Skip for now
        </motion.button>
      )}
    </div>
  );
}
