import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { events, formatDate } from '../data/events.js';
import { validateField, validateForm } from '../utils/validation.js';
import { saveRegistration } from '../utils/storage.js';

const EMPTY = { name: '', email: '', phone: '', eventId: '' };
const FIELDS = Object.keys(EMPTY);

const inputBase =
  'mt-2 w-full rounded-xl border bg-paper px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:ring-4';
const inputOk = 'border-line focus:border-accent focus:ring-accent/15';
const inputBad = 'border-danger focus:border-danger focus:ring-danger/15';

function Field({ label, htmlFor, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      <p id={`${htmlFor}-error`} aria-live="polite" className="mt-2 min-h-[1.25rem] text-sm text-danger">
        {error}
      </p>
    </div>
  );
}

function SuccessDialog({ registration, event, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-6 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-paper p-8 text-center shadow-2xl"
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-ink">
          <Check size={26} aria-hidden="true" />
        </div>
        <h3 id="success-title" className="mt-6 font-display text-3xl font-bold">
          You are on the list
        </h3>
        <p className="mt-3 text-muted">
          {registration.name}, your spot for <span className="font-semibold text-ink">{event.title}</span> is saved
          in this browser.
        </p>
        <p className="mt-2 text-sm text-muted">
          {formatDate(event.date)} at {event.venue}
        </p>
        <button type="button" autoFocus onClick={onClose} className="btn-primary mt-8 w-full">
          Done
        </button>
      </div>
    </div>
  );
}

export default function RegistrationForm({ preselect }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(null);
  const [submitError, setSubmitError] = useState('');

  // Pre-fill the event when a "Register" button elsewhere on the page is pressed.
  useEffect(() => {
    if (preselect?.eventId) setValues((v) => ({ ...v, eventId: preselect.eventId }));
  }, [preselect]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    setTouched(Object.fromEntries(FIELDS.map((f) => [f, true])));

    const found = validateForm(values);
    setErrors(found);
    const firstInvalid = FIELDS.find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(`reg-${firstInvalid}`)?.focus();
      return;
    }

    const event = events.find((ev) => ev.id === values.eventId);
    const result = saveRegistration({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      eventId: event.id,
      eventTitle: event.title,
    });

    if (!result.ok) {
      if (result.reason === 'duplicate') {
        setErrors((prev) => ({ ...prev, email: 'This email is already registered for that event.' }));
        document.getElementById('reg-email')?.focus();
      } else {
        setSubmitError('We could not save your registration. Check that browser storage is enabled, then try again.');
      }
      return;
    }

    setSuccess({ record: result.record, event });
    setValues(EMPTY);
    setTouched({});
    setErrors({});
  };

  const fieldProps = (name) => ({
    id: `reg-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': `reg-${name}-error`,
    className: `${inputBase} ${errors[name] ? inputBad : inputOk}`,
  });

  return (
    <section id="register" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-start">
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Reserve your spot</h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            Choose an event and add your details. Email and phone are checked as you type, so you can fix mistakes
            before you submit. Registrations are saved in this browser.
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit} className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
          <div className="grid gap-5">
            <Field label="Full name" htmlFor="reg-name" error={touched.name && errors.name}>
              <input {...fieldProps('name')} autoComplete="name" placeholder="Priya Sharma" />
            </Field>

            <Field label="Email address" htmlFor="reg-email" error={touched.email && errors.email}>
              <input {...fieldProps('email')} type="email" autoComplete="email" placeholder="you@example.com" />
            </Field>

            <Field label="Phone number" htmlFor="reg-phone" error={touched.phone && errors.phone}>
              <input {...fieldProps('phone')} type="tel" autoComplete="tel" placeholder="+91 98765 43210" />
            </Field>

            <Field label="Event" htmlFor="reg-eventId" error={touched.eventId && errors.eventId}>
              <select {...fieldProps('eventId')}>
                <option value="">Choose an event</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id} disabled={ev.seatsLeft === 0}>
                    {ev.seatsLeft === 0 ? `${ev.title} (sold out)` : ev.title}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {submitError && (
            <p role="alert" className="mt-5 text-sm text-danger">
              {submitError}
            </p>
          )}

          <button type="submit" className="btn-primary mt-8 w-full">
            Reserve my spot
          </button>
        </form>
      </div>

      {success && (
        <SuccessDialog registration={success.record} event={success.event} onClose={() => setSuccess(null)} />
      )}
    </section>
  );
}
