'use client';

import { useState } from 'react';

type State = { status: 'idle' | 'sending' | 'sent' | 'error'; message?: string };

export default function ContactForm() {
  const [state, setState] = useState<State>({ status: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState({ status: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Something went wrong. Please try LinkedIn instead.');
      setState({ status: 'sent' });
    } catch (err) {
      setState({ status: 'error', message: (err as Error).message });
    }
  }

  if (state.status === 'sent') {
    return (
      <div className="form-done" role="status">
        <span className="form-done-big">Thank you!</span>
        <p>Your message is on its way — I&rsquo;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <label className="field">
        <span className="mono">01 — Name *</span>
        <input name="name" required minLength={2} maxLength={200} autoComplete="name" placeholder="Your name" />
      </label>
      <label className="field">
        <span className="mono">02 — Email address *</span>
        <input name="email" type="email" required maxLength={320} autoComplete="email" placeholder="you@company.com" />
      </label>
      <label className="field field-wide">
        <span className="mono">03 — Message *</span>
        <textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Tell me about the role or project" />
      </label>
      {/* Honeypot: hidden from people, irresistible to bots */}
      <input name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />
      <div className="form-foot">
        {state.status === 'error' && <p className="form-error" role="alert">{state.message}</p>}
        <button className="btn" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? 'Sending…' : 'Send message'} <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}
