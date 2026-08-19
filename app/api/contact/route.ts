import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please enter a message of at least 5 characters." },
        { status: 400 }
      );
    }

    const cleanSubject = subject?.trim() || "Portfolio Direct Transmission";
    const timestamp = new Date().toISOString();
    const transmissionId = `TX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Attempt to forward via Web3Forms or webhook if access key configured
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    let forwarded = false;

    if (web3FormsKey) {
      try {
        const w3fRes = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: name.trim(),
            email: email.trim(),
            subject: `[Portfolio] ${cleanSubject}`,
            message: message.trim(),
            from_name: "Naksh Portfolio Terminal",
            to_email: "thenakshprajapat@gmail.com",
            transmission_id: transmissionId,
          }),
        });
        if (w3fRes.ok) {
          forwarded = true;
        }
      } catch (err) {
        console.warn("Web3Forms transmission error:", err);
      }
    }

    if (!forwarded && discordWebhookUrl) {
      try {
        await fetch(discordWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: `📩 New Message: ${cleanSubject}`,
                color: 0x10b981,
                fields: [
                  { name: "Sender", value: `${name.trim()} (${email.trim()})`, inline: true },
                  { name: "Transmission ID", value: transmissionId, inline: true },
                  { name: "Message", value: message.trim() },
                ],
                footer: { text: "Naksh Portfolio Direct Contact" },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
        forwarded = true;
      } catch (err) {
        console.warn("Discord webhook transmission error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Transmission received and routed successfully.",
      transmissionId,
      timestamp,
      recipient: "thenakshprajapat@gmail.com",
      forwarded,
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Transmission failed. Please use direct email." },
      { status: 500 }
    );
  }
}
