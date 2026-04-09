import { NextResponse } from "next/server";
import { SERVICES } from "@/lib/constants";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const { allowed } = checkRateLimit(`services-${ip}`);

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let filtered = SERVICES.filter((s) => s.status === "active");

  if (category) {
    filtered = filtered.filter((s) => s.category === category);
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
}
