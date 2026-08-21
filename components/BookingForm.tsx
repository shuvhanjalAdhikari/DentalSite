'use client';

import { useState, type FormEvent } from 'react';
import { siteConfig } from '@/site.config';
import { services } from '@/content/services';

type Errors = Partial<Record<'name' | 'phone' | 'when', string>>;
type Status = 'idle' | 'submitting' | 'sent' | 'error';

export function BookingForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const endpoint = siteConfig.formEndpoint;

  const validate = (form: HTMLFormElement): Errors => {
    const data = new FormData(form);
    const next: Errors = {};
    if (!String(data.get('name') || '').trim()) next.name = 'Enter the name we should ask for.';
    if (!String(data.get('phone') || '').trim())
      next.phone = 'Enter a phone number we can reach you on.';
    if (!String(data.get('when') || '').trim())
      next.when = 'Tell us roughly when suits — a day and a rough time.';
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
        <p className="font-display text-xl text-ink">Visit requested.</p>
        <p className="text-sm text-muted mt-2">
          We&rsquo;ll confirm the time by phone or email within one working day. This is a request,
          not a confirmed appointment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <div>
        <label htmlFor="b-name" className="block text-sm text-ink font-medium mb-2">
          Your name
        </label>
        <input
          id="b-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'b-name-error' : undefined}
          className="w-full bg-white border border-line rounded-md px-4 py-3 text-base"
        />
        {errors.name && (
          <p id="b-name-error" role="alert" className="mt-2 text-sm text-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="b-phone" className="block text-sm text-ink font-medium mb-2">
            Phone
          </label>
          <input
            id="b-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'b-phone-error' : undefined}
            className="w-full bg-white border border-line rounded-md px-4 py-3 text-base"
          />
          {errors.phone && (
            <p id="b-phone-error" role="alert" className="mt-2 text-sm text-error">
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="b-email" className="block text-sm text-ink font-medium mb-2">
            Email <span className="text-muted font-normal">(optional)</span>
          </label>
          <input
            id="b-email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full bg-white border border-line rounded-md px-4 py-3 text-base"
          />
        </div>
      </div>

      <div>
        <label htmlFor="b-service" className="block text-sm text-ink font-medium mb-2">
          What would you like to be seen for?
        </label>
        <select
          id="b-service"
          name="service"
          defaultValue="check-up-and-clean"
          className="w-full bg-white border border-line rounded-md px-4 py-3 text-base"
        >
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
          <option value="not-sure">Not sure yet</option>
          <option value="emergency">Something urgent</option>
        </select>
      </div>

      <div>
        <label htmlFor="b-when" className="block text-sm text-ink font-medium mb-2">
          When suits?
        </label>
        <input
          id="b-when"
          name="when"
          type="text"
          required
          placeholder="e.g. Tuesday afternoon, or next week if possible"
          aria-invalid={!!errors.when}
          aria-describedby={errors.when ? 'b-when-error' : 'b-when-hint'}
          className="w-full bg-white border border-line rounded-md px-4 py-3 text-base"
        />
        {errors.when ? (
          <p id="b-when-error" role="alert" className="mt-2 text-sm text-error">
            {errors.when}
          </p>
        ) : (
          <p id="b-when-hint" className="mt-2 text-sm text-muted">
            A rough window is fine — we&rsquo;ll offer specific times when we reply.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="b-notes" className="block text-sm text-ink font-medium mb-2">
          Anything we should know?{' '}
          <span className="text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="b-notes"
          name="notes"
          rows={4}
          className="w-full bg-white border border-line rounded-md px-4 py-3 text-base"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-error">
          {endpoint
            ? 'Request did not send. Please try again or call the practice.'
            : 'Form endpoint not configured — please call the practice.'}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-md bg-petrol text-white font-medium hover:bg-petrol-deep transition-colors duration-150 disabled:opacity-70"
        >
          {status === 'submitting' ? 'Sending…' : 'Request a visit'}
        </button>
      </div>
    </form>
  );
}
