import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL_ENV_KEYS = ["SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"] as const;

const SERVICE_ROLE_ENV_KEYS = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_SERVICE_KEY",
  "SUPABASE_SECRET_KEY",
] as const;

export type SupabaseEnvPresence = Record<
  (typeof URL_ENV_KEYS)[number] | (typeof SERVICE_ROLE_ENV_KEYS)[number],
  boolean
>;

function readEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value || undefined;
}

export function getSupabaseEnvPresence(): SupabaseEnvPresence {
  return {
    SUPABASE_URL: Boolean(readEnv("SUPABASE_URL")),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(readEnv("NEXT_PUBLIC_SUPABASE_URL")),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(readEnv("SUPABASE_SERVICE_ROLE_KEY")),
    SUPABASE_SERVICE_KEY: Boolean(readEnv("SUPABASE_SERVICE_KEY")),
    SUPABASE_SECRET_KEY: Boolean(readEnv("SUPABASE_SECRET_KEY")),
  };
}

export function getSupabaseUrl(): string | undefined {
  for (const key of URL_ENV_KEYS) {
    const value = readEnv(key);
    if (value) return value;
  }
  return undefined;
}

export function getSupabaseServiceRoleKey(): string | undefined {
  for (const key of SERVICE_ROLE_ENV_KEYS) {
    const value = readEnv(key);
    if (value) return value;
  }
  return undefined;
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
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!url || !serviceRoleKey) {
    const missing: string[] = [];
    if (!url) missing.push("SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL");
    if (!serviceRoleKey) {
      missing.push(
        "SUPABASE_SERVICE_ROLE_KEY, SUPABASE_SERVICE_KEY, or SUPABASE_SECRET_KEY",
      );
    }
    return `Missing environment variables: ${missing.join("; ")}`;
  }

  if (!url.startsWith("https://") || !url.includes("supabase.co")) {
    return "Supabase URL does not look like a valid project URL";
  }

  const role = getJwtRole(serviceRoleKey);
  if (role === "anon") {
    return "Service role env var is the anon/publishable key. Use the service_role secret from Supabase Dashboard → Project Settings → API keys.";
  }

  if (role && role !== "service_role") {
    return `Service role env var has unexpected JWT role "${role}"`;
  }

  return null;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseServiceRoleKey());
}

export function createSupabaseAdmin(): SupabaseClient {
  const url = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

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
