import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { MOCK_REVENUE_DATA } from "@/lib/constants";

export async function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const { allowed } = checkRateLimit(`analytics-${ip}`, {
    windowMs: 60_000,
    maxRequests: 20,
  });

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  // In production, query real data from database
  const analyticsData = {
    revenue: MOCK_REVENUE_DATA,
    summary: {
      totalRevenue: MOCK_REVENUE_DATA.reduce((sum, d) => sum + d.revenue, 0),
      totalOrders: MOCK_REVENUE_DATA.reduce((sum, d) => sum + d.orders, 0),
      averageOrderValue: Math.round(
        MOCK_REVENUE_DATA.reduce((sum, d) => sum + d.revenue, 0) /
          MOCK_REVENUE_DATA.reduce((sum, d) => sum + d.orders, 0)
      ),
      conversionRate: 4.3,
    },
    topCategories: [
      { name: "Templates", percentage: 35 },
      { name: "Components", percentage: 25 },
      { name: "Tools", percentage: 20 },
      { name: "Plugins", percentage: 12 },
      { name: "APIs", percentage: 8 },
    ],
  };

  return NextResponse.json({
    success: true,
    data: analyticsData,
  });
}
