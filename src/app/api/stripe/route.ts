import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateId, sanitizeInput } from "@/lib/utils";
import { PRODUCTS, SERVICES } from "@/lib/constants";

interface CheckoutRequestBody {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    type: string;
  }>;
  customer: {
    name: string;
    email: string;
    company?: string;
  };
  totalAmount: number;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
    const { allowed } = checkRateLimit(`stripe-${ip}`, {
      windowMs: 60_000,
      maxRequests: 10,
    });

    if (!allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as CheckoutRequestBody;

    // Input validation
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 }
      );
    }

    if (!body.customer?.name || !body.customer?.email) {
      return NextResponse.json(
        { success: false, error: "Customer information is required" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedCustomer = {
      name: sanitizeInput(body.customer.name),
      email: sanitizeInput(body.customer.email),
      company: body.customer.company
        ? sanitizeInput(body.customer.company)
        : undefined,
    };

    // Calculate total server-side using canonical prices from catalog
    let serverTotal = 0;
    for (const item of body.items) {
      if (item.type === "product") {
        const product = PRODUCTS.find((p) => p.id === item.id);
        if (!product) {
          return NextResponse.json(
            { success: false, error: `Unknown product: ${item.id}` },
            { status: 400 }
          );
        }
        serverTotal += product.price * item.quantity;
      } else if (item.type === "service") {
        const service = SERVICES.find((s) => s.id === item.id);
        if (!service) {
          return NextResponse.json(
            { success: false, error: `Unknown service: ${item.id}` },
            { status: 400 }
          );
        }
        // For services, the price comes from configuration; use the client price
        // but ensure it's at least the base price
        if (item.price < service.basePrice) {
          return NextResponse.json(
            { success: false, error: `Invalid price for service: ${item.id}` },
            { status: 400 }
          );
        }
        serverTotal += item.price * item.quantity;
      } else {
        return NextResponse.json(
          { success: false, error: `Unknown item type: ${item.type}` },
          { status: 400 }
        );
      }
    }

    // Verify client-provided total matches server calculation
    if (Math.abs(serverTotal - body.totalAmount) > 0.01) {
      return NextResponse.json(
        { success: false, error: "Price mismatch. Please refresh and try again." },
        { status: 400 }
      );
    }

    // Check if Stripe is configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (stripeSecretKey) {
      // Real Stripe integration not yet implemented.
      // Return an error to prevent silently processing free orders.
      return NextResponse.json(
        { success: false, error: "Stripe integration is not yet fully configured. Please contact support." },
        { status: 501 }
      );
    }

    // Demo mode - simulate successful payment (only when Stripe is NOT configured)
    const orderId = `ORD-${generateId()}`;

    // Log the order (in production, save to database)
    console.log("[Order Created]", {
      orderId,
      customer: sanitizedCustomer,
      items: body.items.length,
      total: serverTotal,
      timestamp: new Date().toISOString(),
    });

    // Simulate digital delivery
    console.log("[Digital Delivery]", {
      orderId,
      email: sanitizedCustomer.email,
      status: "delivered",
    });

    return NextResponse.json({
      success: true,
      orderId,
      message: "Order processed successfully",
      deliveryStatus: "delivered",
    });
  } catch (error) {
    console.error("[Stripe API Error]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
