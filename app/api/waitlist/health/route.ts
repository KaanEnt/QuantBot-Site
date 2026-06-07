import { NextResponse } from "next/server";

import {
  createSupabaseAdmin,
  getSupabaseConfigIssue,
  getSupabaseEnvPresence,
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

  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("waitlist").select("email").limit(1);

    if (error) {
      return NextResponse.json({
        ok: false,
        configured: true,
        issue: error.message,
        code: error.code,
        envPresent,
      });
    }

    return NextResponse.json({
      ok: true,
      configured: true,
      envPresent,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      configured: true,
      issue: error instanceof Error ? error.message : "Unknown error",
      envPresent,
    });
  }
}
