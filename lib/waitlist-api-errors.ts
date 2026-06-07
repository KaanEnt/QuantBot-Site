import { NextResponse } from "next/server";

type SupabaseError = {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
};

function isAuthConfigError(error: SupabaseError): boolean {
  const message = error.message?.toLowerCase() ?? "";

  return (
    error.code === "PGRST301" ||
    message.includes("invalid api key") ||
    message.includes("invalid jwt") ||
    message.includes("jwt expired") ||
    message === "jwt malformed"
  );
}

function isMissingTableError(error: SupabaseError): boolean {
  return (
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    (error.message?.toLowerCase().includes("could not find the table") ?? false)
  );
}

export function logWaitlistSupabaseError(
  operation: "insert" | "upsert",
  error: SupabaseError,
): void {
  console.error(`Waitlist ${operation} error:`, {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  });
}

export function waitlistErrorResponse(
  operation: "insert" | "upsert",
  error: SupabaseError,
): NextResponse {
  logWaitlistSupabaseError(operation, error);

  if (isMissingTableError(error) || isAuthConfigError(error)) {
    return NextResponse.json(
      { error: "Waitlist is not configured yet." },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      error:
        operation === "insert"
          ? "Unable to join waitlist. Please try again."
          : "Unable to save preference. Please try again.",
    },
    { status: 500 },
  );
}
