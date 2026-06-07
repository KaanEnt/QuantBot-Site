import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL_ENV_KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_URL",
] as const;

const ADMIN_KEY_ENV_KEYS = [
  "SUPABASE_SECRET_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_SERVICE_KEY",
] as const;

const ANON_KEY_ENV_KEYS = [
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_ANON_KEY",
] as const;

export type SupabaseEnvPresence = Record<
  | (typeof URL_ENV_KEYS)[number]
  | (typeof ADMIN_KEY_ENV_KEYS)[number]
  | (typeof ANON_KEY_ENV_KEYS)[number],
  boolean
>;

function readEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value || undefined;
}

function parseJwtPayload(key: string): { role?: string; ref?: string } | null {
  const parts = key.split(".");
  if (parts.length !== 3) {
    return null;
  }

  try {
    return JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf8"),
    ) as { role?: string; ref?: string };
  } catch {
    return null;
  }
}

function getProjectRefFromUrl(url: string): string | null {
  const match = url.match(/https:\/\/([a-z0-9-]+)\.supabase\.co/i);
  return match?.[1] ?? null;
}

export function getSupabaseEnvPresence(): SupabaseEnvPresence {
  return {
    SUPABASE_URL: Boolean(readEnv("SUPABASE_URL")),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(readEnv("NEXT_PUBLIC_SUPABASE_URL")),
    SUPABASE_SECRET_KEY: Boolean(readEnv("SUPABASE_SECRET_KEY")),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(readEnv("SUPABASE_SERVICE_ROLE_KEY")),
    SUPABASE_SERVICE_KEY: Boolean(readEnv("SUPABASE_SERVICE_KEY")),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")),
    SUPABASE_ANON_KEY: Boolean(readEnv("SUPABASE_ANON_KEY")),
  };
}

export function getSupabaseUrl(): string | undefined {
  for (const key of URL_ENV_KEYS) {
    const value = readEnv(key);
    if (value) return value;
  }
  return undefined;
}

export function getSupabaseUrlSource(): string | null {
  for (const key of URL_ENV_KEYS) {
    if (readEnv(key)) return key;
  }
  return null;
}

export function getSupabaseHost(): string | null {
  const url = getSupabaseUrl();
  if (!url) return null;

  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

export function getSupabaseAdminKeys(): string[] {
  const keys: string[] = [];

  for (const envKey of ADMIN_KEY_ENV_KEYS) {
    const value = readEnv(envKey);
    if (!value) continue;

    const role = parseJwtPayload(value)?.role;
    if (role === "anon") continue;

    keys.push(value);
  }

  return keys;
}

export function getSupabaseAnonKey(): string | undefined {
  for (const key of ANON_KEY_ENV_KEYS) {
    const value = readEnv(key);
    if (value) return value;
  }
  return undefined;
}

export function getSupabaseUrlKeyMismatch(): string | null {
  const url = getSupabaseUrl();
  if (!url) return null;

  const urlRef = getProjectRefFromUrl(url);
  if (!urlRef) return null;

  const keysToCheck = [
    ...getSupabaseAdminKeys(),
    ...(getSupabaseAnonKey() ? [getSupabaseAnonKey()!] : []),
  ];

  for (const key of keysToCheck) {
    const keyRef = parseJwtPayload(key)?.ref;
    if (keyRef && keyRef !== urlRef) {
      return `Supabase URL project (${urlRef}) does not match API key project (${keyRef}). Prefer NEXT_PUBLIC_SUPABASE_URL and keys from the same Supabase project.`;
    }
  }

  return null;
}

export function getSupabaseConfigIssue(): string | null {
  const url = getSupabaseUrl();
  const hasAdminKey = getSupabaseAdminKeys().length > 0;
  const hasAnonKey = Boolean(getSupabaseAnonKey());

  if (!url) {
    return "Missing environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL";
  }

  if (!hasAdminKey && !hasAnonKey) {
    return "Missing Supabase API key: set SUPABASE_SERVICE_ROLE_KEY, SUPABASE_SECRET_KEY, or NEXT_PUBLIC_SUPABASE_ANON_KEY";
  }

  if (!url.startsWith("https://") || !url.includes("supabase.co")) {
    return "Supabase URL does not look like a valid project URL";
  }

  return getSupabaseUrlKeyMismatch();
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    getSupabaseUrl() && (getSupabaseAdminKeys().length > 0 || getSupabaseAnonKey()),
  );
}

function createSupabaseClient(apiKey: string): SupabaseClient {
  const url = getSupabaseUrl();
  if (!url) {
    throw new Error("Missing Supabase URL");
  }

  return createClient(url, apiKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function createSupabaseAdmin(): SupabaseClient {
  const adminKey = getSupabaseAdminKeys()[0];
  if (!adminKey) {
    throw new Error("Missing Supabase admin API key");
  }

  return createSupabaseClient(adminKey);
}

export function createSupabaseAnon(): SupabaseClient | null {
  const anonKey = getSupabaseAnonKey();
  if (!anonKey) return null;
  return createSupabaseClient(anonKey);
}

type WaitlistDbError = {
  code?: string;
  message?: string;
};

function isRetryableKeyError(error: WaitlistDbError): boolean {
  return error.code === "42501" || error.code === "PGRST301";
}

export async function insertWaitlistEmail(
  email: string,
): Promise<{ error: WaitlistDbError | null; alreadyExists?: boolean }> {
  let lastError: WaitlistDbError | null = null;

  for (const adminKey of getSupabaseAdminKeys()) {
    const supabase = createSupabaseClient(adminKey);
    const { error } = await supabase.from("waitlist").insert({ email });

    if (!error) {
      return { error: null };
    }

    if (error.code === "23505") {
      return { error: null, alreadyExists: true };
    }

    lastError = error;
    if (!isRetryableKeyError(error)) {
      return { error };
    }
  }

  const anonClient = createSupabaseAnon();
  if (anonClient) {
    const { error } = await anonClient.from("waitlist").insert({ email });

    if (!error) {
      return { error: null };
    }

    if (error.code === "23505") {
      return { error: null, alreadyExists: true };
    }

    lastError = error;
  }

  return { error: lastError };
}

export async function upsertWaitlistPreference(
  email: string,
  preferredMode: string,
): Promise<{ error: WaitlistDbError | null }> {
  let lastError: WaitlistDbError | null = null;

  for (const adminKey of getSupabaseAdminKeys()) {
    const supabase = createSupabaseClient(adminKey);
    const { error } = await supabase
      .from("waitlist")
      .upsert({ email, preferred_mode: preferredMode }, { onConflict: "email" });

    if (!error) {
      return { error: null };
    }

    lastError = error;
    if (!isRetryableKeyError(error)) {
      return { error };
    }
  }

  return { error: lastError };
}
