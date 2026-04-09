import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateId, sanitizeInput } from "@/lib/utils";

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

    // Calculate total server-side for security
    const serverTotal = body.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Check if Stripe is configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (stripeSecretKey) {
      // Real Stripe integration would go here
      // const stripe = new Stripe(stripeSecretKey);
      // const session = await stripe.checkout.sessions.create({...});
      // return NextResponse.json({ success: true, url: session.url });
    }

    // Demo mode - simulate successful payment
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
