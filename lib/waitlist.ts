export function scrollToWaitlist() {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    document.getElementById("waitlist-email")?.focus();
  }, 450);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export type PreferredMode = "agentic-teacher" | "quant-teacher" | "general";
