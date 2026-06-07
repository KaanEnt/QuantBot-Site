import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getSupabaseUrl(): string | undefined {
  return (
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  );
}

function getJwtRole(key: string): string | null {
  const parts = key.split(".");
  if (parts.length !== 3) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf8"),
    ) as { role?: string };
    return payload.role ?? null;
  } catch {
    return null;
  }
}

export function getSupabaseConfigIssue(): string | null {
  const url = getSupabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    const missing: string[] = [];
    if (!url) missing.push("SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)");
    if (!serviceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
    return `Missing environment variables: ${missing.join(", ")}`;
  }

  if (!url.startsWith("https://") || !url.includes("supabase.co")) {
    return "SUPABASE_URL does not look like a Supabase project URL";
  }

  const role = getJwtRole(serviceRoleKey);
  if (role === "anon") {
    return "SUPABASE_SERVICE_ROLE_KEY is the anon/publishable key. Use the service_role secret from Supabase Dashboard → Project Settings → API keys.";
  }

  if (role && role !== "service_role") {
    return `SUPABASE_SERVICE_ROLE_KEY has unexpected JWT role "${role}"`;
  }

  return null;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    getSupabaseUrl() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  );
}

export function createSupabaseAdmin(): SupabaseClient {
  const url = getSupabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
