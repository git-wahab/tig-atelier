import { NextResponse } from "next/server";

/**
 * Receives the contact form.
 *
 * TODO before launch: send the message to your inbox or support tool
 * (Resend, SendGrid, Postmark, a helpdesk API, and so on). For now it only
 * validates the fields and logs them on the server.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email.includes("@") || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  console.log("[contact]", { name, email, topic: body.topic, order: body.order, message });

  return NextResponse.json({ ok: true });
}
