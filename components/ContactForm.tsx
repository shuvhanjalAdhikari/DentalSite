'use client';

import { useState, type FormEvent } from 'react';
import { siteConfig } from '@/site.config';

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'message', string>>;
type Status = 'idle' | 'submitting' | 'sent' | 'error';

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const endpoint = siteConfig.formEndpoint;

  const validate = (form: HTMLFormElement): Errors => {
    const data = new FormData(form);
    const next: Errors = {};
    if (!String(data.get('name') || '').trim()) next.name = 'Enter the name we should ask for.';
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    if (!phone && !email) {
      next.phone = 'Enter a phone number or email so we can reach you.';
    }
    if (!String(data.get('message') || '').trim())
      next.message = 'Tell us briefly what the message is about.';
    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      e.preventDefault();
      return;
    }
    if (!endpoint) {
      e.preventDefault();
      setStatus('error');
      return;
    }
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div role="status" className="bg-white border border-line rounded-md p-6">
        <p className="font-display text-xl text-ink">Message received.</p>
        <p className="text-sm text-muted mt-2">
          We reply within one working day. If it is urgent, please call the practice.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <div>
        <label htmlFor="c-name" className="block text-sm text-ink font-medium mb-2">
          Your name
        </label>
        <input
          id="c-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'c-name-error' : undefined}
          className="w-full bg-white border border-line rounded-md px-4 py-3 text-base"
        />
        {errors.name && (
          <p id="c-name-error" role="alert" className="mt-2 text-sm text-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="c-phone" className="block text-sm text-ink font-medium mb-2">
            Phone
          </label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'c-phone-error' : 'c-phone-hint'}
            className="w-full bg-white border border-line rounded-md px-4 py-3 text-base"
          />
          {errors.phone ? (
            <p id="c-phone-error" role="alert" className="mt-2 text-sm text-error">
              {errors.phone}
            </p>
          ) : (
            <p id="c-phone-hint" className="mt-2 text-sm text-muted">
              Or an email — one is enough.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="c-email" className="block text-sm text-ink font-medium mb-2">
            Email
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full bg-white border border-line rounded-md px-4 py-3 text-base"
          />
        </div>
      </div>

      <div>
        <label htmlFor="c-message" className="block text-sm text-ink font-medium mb-2">
          Message
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'c-message-error' : undefined}
          className="w-full bg-white border border-line rounded-md px-4 py-3 text-base"
        />
        {errors.message && (
          <p id="c-message-error" role="alert" className="mt-2 text-sm text-error">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-error">
          {endpoint
            ? 'Message did not send. Please try again or call the practice.'
            : 'Form endpoint not configured — please call the practice.'}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-md bg-petrol text-white font-medium hover:bg-petrol-deep transition-colors duration-150 disabled:opacity-70"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
