import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  const { name, email, message, company } = body as Record<string, unknown>;

  // Honeypot — pretend success so bots don't learn to skip it.
  if (typeof company === 'string' && company.trim() !== '') return NextResponse.json({ ok: true });

  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 200) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) {
    return NextResponse.json({ error: 'Please enter a message (at least 10 characters).' }, { status: 400 });
  }

  // Fixed recipient from env — fail closed if unset.
  const recipient = process.env.CONTACT_FORM_RECIPIENT_EMAIL;
  try {
    if (!recipient) throw new Error('CONTACT_FORM_RECIPIENT_EMAIL is not set');
    await sendEmail({
      to: recipient,
      replyTo: { email: email.trim(), name: name.trim() },
      subject: `Portfolio enquiry from ${name.trim()}`,
      text: `${message.trim()}\n\n—\n${name.trim()} <${email.trim()}>`,
    });
  } catch (err) {
    console.error('Contact form send failed:', err);
    return NextResponse.json(
      { error: 'Sorry, that didn’t send. Please reach me on LinkedIn instead.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
