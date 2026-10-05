type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export async function deliverContactSubmission(payload: ContactSubmission) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.warn("Portfolio contact webhook failed.", error);
    }
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? payload.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: payload.email,
        subject: `New portfolio contact from ${payload.name}`,
        html: `
          <h2>New contact message</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Sent:</strong> ${new Date(payload.createdAt).toLocaleString()}</p>
          <p><strong>Message:</strong></p>
          <p>${payload.message.replace(/\n/g, "<br />")}</p>
        `,
      }),
    });
  } catch (error) {
    console.warn("Portfolio contact email delivery failed.", error);
  }
}
