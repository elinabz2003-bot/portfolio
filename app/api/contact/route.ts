import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name: string;
  email: string;
  message: string;
};

function isValidEmail(v: string) {
  return /\S+@\S+\.\S+/.test(v.trim());
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>;

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (name.length < 2) {
      return NextResponse.json({ error: "Nom invalide." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message trop court." },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM;
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || !to || !from) {
      return NextResponse.json(
        { error: "Configuration email manquante (.env.local)." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const subject = `Portfolio — Nouveau message (${name})`;
    const text = `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; background:#f6f8fa; padding:12px; border-radius:8px;">${escapeHtml(
          message
        )}</pre>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
}