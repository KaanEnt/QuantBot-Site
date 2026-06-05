"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { isValidEmail } from "@/lib/waitlist";

type CaptureState = "idle" | "submitting" | "success" | "error";

export function useWaitlistEmail() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<CaptureState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittedEmailRef = useRef<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const submitEmail = useCallback(async (value: string) => {
    const trimmed = value.trim().toLowerCase();

    if (!isValidEmail(trimmed)) {
      return false;
    }

    if (submittedEmailRef.current === trimmed) {
      setState("success");
      return true;
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
        return false;
      }

      submittedEmailRef.current = trimmed;
      setEmail(trimmed);
      setState("success");
      return true;
    } catch {
      setErrorMessage("Unable to join waitlist. Please try again.");
      setState("error");
      return false;
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

  const handleChange = (value: string) => {
    setEmail(value);
    if (state === "error") {
      setState("idle");
      setErrorMessage("");
    }
  };

  const handleJoinClick = () => {
    if (state === "success" || state === "submitting") {
      return;
    }

    if (isValidEmail(email)) {
      void submitEmail(email);
      return;
    }

    document.getElementById("waitlist-email")?.focus();
  };

  return {
    email,
    state,
    errorMessage,
    handleBlur,
    handleChange,
    handleJoinClick,
    isDisabled: state === "submitting" || state === "success",
  };
}
