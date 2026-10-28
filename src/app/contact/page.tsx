import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = { title: 'Say hi', description: 'Get in touch with Ally Colquhoun.' };

export default function Contact() {
  return (
    <div className="contact">
      <header className="contact-hero">
        <p className="label">Contact</p>
        <h1 className="contact-title">
          Say <em>hi!</em>
        </h1>
        <p className="contact-sub">
          Hiring, collaborating, or just want to talk shop? Drop me a line, or find me on{' '}
          <a href="https://www.linkedin.com/in/allycolquhoun/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
