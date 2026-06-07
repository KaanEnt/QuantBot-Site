import { NextResponse } from "next/server";

import {
  getSupabaseAdminKeys,
  getSupabaseAnonKey,
  getSupabaseConfigIssue,
  getSupabaseEnvPresence,
  getSupabaseHost,
  getSupabaseUrlKeyMismatch,
  getSupabaseUrlSource,
  insertWaitlistEmail,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export async function GET() {
  const envPresent = getSupabaseEnvPresence();
  const configured = isSupabaseConfigured();
  const issue = getSupabaseConfigIssue();
  const urlKeyMismatch = getSupabaseUrlKeyMismatch();

  if (!configured || issue) {
    return NextResponse.json({
      ok: false,
      configured,
      issue,
      urlKeyMismatch,
      supabaseHost: getSupabaseHost(),
      urlSource: getSupabaseUrlSource(),
      envPresent,
    });
  }

  const probeEmail = `health-${Date.now()}@example.com`;
  const { error } = await insertWaitlistEmail(probeEmail);

  return NextResponse.json({
    ok: !error,
    configured: true,
    issue: error?.message ?? null,
    code: error?.code ?? null,
    urlKeyMismatch,
    supabaseHost: getSupabaseHost(),
    urlSource: getSupabaseUrlSource(),
    envPresent,
    adminKeyCount: getSupabaseAdminKeys().length,
    hasAnonKey: Boolean(getSupabaseAnonKey()),
    fix:
      error?.code === "42501"
        ? "Run supabase/fix-waitlist-permissions.sql in the Supabase SQL editor for this project."
        : null,
  });
}
