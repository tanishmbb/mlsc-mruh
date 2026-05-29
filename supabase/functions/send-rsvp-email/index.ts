import { serve } from "https://deno.land/std@0.224.0/http/server.ts"

serve(async (req) => {
  try {
    const { rsvp_id } = await req.json()

    if (!rsvp_id) {
      return new Response("Missing RSVP ID", { status: 400 })
    }

    // 🔒 TEMP: send ONLY to your own email (Resend test restriction)
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MLSC MRUH <onboarding@resend.dev>",
        to: ["shlokdiddi7@gmail.com"], // MUST be Resend account email
        subject: "RSVP Confirmed ✅",
        html: `
          <h2>RSVP Confirmed</h2>
          <p>Your RSVP has been recorded successfully.</p>
          <p><b>RSVP ID:</b> ${rsvp_id}</p>
          <p>QR code will be added next.</p>
        `,
      }),
    })

    const text = await res.text()

    return new Response(text, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500 }
    )
  }
})
