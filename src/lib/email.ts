// Sends contact-form email through Brevo's REST API. Deliberately not
// GoDaddy's built-in email gateway: that sends from allycolquhoun.au, which
// has no SPF/DKIM, so Gmail rejects it and Microsoft quarantines it as
// phishing. ally@thelocaldesk.au is already a verified Brevo sender.
const BREVO_SEND_URL = 'https://api.brevo.com/v3/smtp/email';

const SENDER = { name: 'Ally Colquhoun — Portfolio', email: 'ally@thelocaldesk.au' };

export async function sendEmail(params: {
  to: string;
  replyTo: { email: string; name?: string };
  subject: string;
  text: string;
}): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error('BREVO_API_KEY is not set');

  const res = await fetch(BREVO_SEND_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender: SENDER,
      to: [{ email: params.to }],
      replyTo: params.replyTo,
      subject: params.subject,
      textContent: params.text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Brevo send failed (${res.status}): ${await res.text()}`);
  }
}
