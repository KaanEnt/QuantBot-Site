import type { PreferredMode } from "@/lib/waitlist";

const devWaitlist = new Map<string, PreferredMode | null>();

export function devWaitlistInsert(email: string): { alreadyExists: boolean } {
  if (devWaitlist.has(email)) {
    return { alreadyExists: true };
  }

  devWaitlist.set(email, null);
  return { alreadyExists: false };
}

export function devWaitlistUpsert(
  email: string,
  preferredMode: PreferredMode,
): void {
  devWaitlist.set(email, preferredMode);
}

export function isDevWaitlistFallbackEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}
