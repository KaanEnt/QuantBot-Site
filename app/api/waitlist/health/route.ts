import { NextResponse } from "next/server";

import {
  getSupabaseAdminKeys,
  getSupabaseAnonKey,
  getSupabaseConfigIssue,
  getSupabaseEnvPresence,
  insertWaitlistEmail,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export async function GET() {
  const envPresent = getSupabaseEnvPresence();
  const configured = isSupabaseConfigured();
  const issue = getSupabaseConfigIssue();

  if (!configured || issue) {
    return NextResponse.json({
      ok: false,
      configured,
      issue,
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
    envPresent,
    adminKeyCount: getSupabaseAdminKeys().length,
    hasAnonKey: Boolean(getSupabaseAnonKey()),
  });
}
