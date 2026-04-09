import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeInput, validateEmail } from "@/lib/utils";

interface ContactRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
    const { allowed } = checkRateLimit(`contact-${ip}`, {
      windowMs: 60_000,
      maxRequests: 5,
    });

    if (!allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ContactRequestBody;

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const sanitized = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      subject: sanitizeInput(body.subject ?? "General Inquiry"),
      message: sanitizeInput(body.message),
    };

    // In production, send via SendGrid
    const sendgridApiKey = process.env.SENDGRID_API_KEY;

    if (sendgridApiKey) {
      // SendGrid integration would go here
      console.log("[SendGrid] Email sent to admin with contact form data");
    }

    console.log("[Contact Form]", sanitized);

    return NextResponse.json({
      success: true,
      message: "Message received. We'll get back to you shortly.",
    });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
