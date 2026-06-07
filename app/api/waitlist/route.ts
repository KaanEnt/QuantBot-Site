import { NextResponse } from "next/server";

import {
  getSupabaseConfigIssue,
  insertWaitlistEmail,
  isSupabaseConfigured,
  upsertWaitlistPreference,
} from "@/lib/supabase/server";
import { waitlistErrorResponse } from "@/lib/waitlist-api-errors";
import type { PreferredMode } from "@/lib/waitlist";
import {
  devWaitlistInsert,
  devWaitlistUpsert,
  isDevWaitlistFallbackEnabled,
} from "@/lib/waitlist-dev-store";

const VALID_MODES: PreferredMode[] = [
  "agentic-teacher",
  "quant-teacher",
  "general",
];

function normalizeEmail(email: unknown): string | null {
  if (typeof email !== "string") return null;
  const trimmed = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null;
  return trimmed;
}

function notConfiguredResponse(): NextResponse {
  console.error(
    "Waitlist config issue:",
    getSupabaseConfigIssue() ?? "Supabase env vars are not set",
  );
  return NextResponse.json(
    { error: "Waitlist is not configured yet." },
    { status: 503 },
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(body.email);

    if (!email) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    if (!isSupabaseConfigured()) {
      if (isDevWaitlistFallbackEnabled()) {
        const { alreadyExists } = devWaitlistInsert(email);
        return NextResponse.json({ ok: true, alreadyExists, mock: true });
      }

      return notConfiguredResponse();
    }

    const configIssue = getSupabaseConfigIssue();
    if (configIssue) {
      console.error("Waitlist config issue:", configIssue);
      return notConfiguredResponse();
    }

    const { error, alreadyExists } = await insertWaitlistEmail(email);

    if (alreadyExists) {
      return NextResponse.json({ ok: true, alreadyExists: true });
    }

    if (error) {
      return waitlistErrorResponse("insert", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Waitlist POST error:", error);
    return NextResponse.json(
      { error: "Unable to join waitlist. Please try again." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(body.email);
    const preferredMode = body.preferred_mode as PreferredMode;

    if (!email) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    if (!VALID_MODES.includes(preferredMode)) {
      return NextResponse.json(
        { error: "Invalid track preference" },
        { status: 400 },
      );
    }

    if (!isSupabaseConfigured()) {
      if (isDevWaitlistFallbackEnabled()) {
        devWaitlistUpsert(email, preferredMode);
        return NextResponse.json({ ok: true, mock: true });
      }

      return notConfiguredResponse();
    }

    const configIssue = getSupabaseConfigIssue();
    if (configIssue) {
      console.error("Waitlist config issue:", configIssue);
      return notConfiguredResponse();
    }

    const { error } = await upsertWaitlistPreference(email, preferredMode);

    if (error) {
      return waitlistErrorResponse("upsert", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Waitlist PATCH error:", error);
    return NextResponse.json(
      { error: "Unable to save preference. Please try again." },
      { status: 500 },
    );
  }
}
