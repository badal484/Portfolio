import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/validation";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return NextResponse.json(
      { message: "Please fix the highlighted fields.", errors: validation.errors },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!resendApiKey || !contactToEmail) {
    // TODO: Add RESEND_API_KEY and CONTACT_TO_EMAIL in Vercel to send real email.
    console.info("Contact form submission:", validation.data);
    return NextResponse.json({
      message: "Message received locally. TODO: configure Resend env vars to send email."
    });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: contactToEmail,
      reply_to: validation.data.email,
      subject: `Portfolio message from ${validation.data.name}`,
      text: [
        `Name: ${validation.data.name}`,
        `Email: ${validation.data.email}`,
        "",
        validation.data.message
      ].join("\n")
    })
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Email service failed. Please email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: "Message sent. I will reply soon." });
}
