import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();

    await resend.emails.send({
      from: "Newsletter <onboarding@resend.dev>",
      to: email,
      subject: "Bienvenue à notre newsletter",
      html: `<p>Merci pour votre inscription à notre newsletter !</p>`,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to send email" });
  }
}
