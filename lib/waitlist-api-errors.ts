import { NextResponse } from "next/server";

type SupabaseError = {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
};

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

  if (error.code === "42P01") {
    return NextResponse.json(
      { error: "Waitlist is not configured yet." },
      { status: 503 },
    );
  }

  const message = error.message?.toLowerCase() ?? "";
  if (
    error.code === "PGRST301" ||
    message.includes("invalid api key") ||
    message.includes("jwt") ||
    message.includes("permission denied")
  ) {
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
