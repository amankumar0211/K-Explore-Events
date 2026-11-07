import { useEffect } from 'react';
import { Clock, MapPin, Ticket, X } from 'lucide-react';
import Countdown from './Countdown.jsx';
import { formatDate, formatPrice, getStatus } from '../data/events.js';

export default function EventModal({ event, onClose, onRegister }) {
  useEffect(() => {
    if (!event) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [event, onClose]);

  if (!event) return null;

  const status = getStatus(event);
  const soldOut = status === 'Sold out';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-paper shadow-2xl sm:rounded-3xl"
      >
        <div className="relative">
          <img src={event.banner} alt="" className="h-56 w-full object-cover sm:h-72" />
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close event details"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-surface text-ink shadow"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {event.category}
            </span>
            <h2 id="event-modal-title" className="mt-4 font-display text-4xl font-bold leading-tight">
              {event.title}
            </h2>
            <p className="mt-3 flex items-center gap-2 text-muted">
              <Clock size={16} aria-hidden="true" />
              {formatDate(event.date)}
            </p>
            <p className="mt-6 leading-relaxed">{event.description}</p>

            <h3 className="mt-8 font-display text-xl font-bold">Speakers</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {event.speakers.map((s) => (
                <li key={s.name} className="rounded-2xl border border-line bg-surface p-4">
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-muted">{s.role}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">Hosted by {event.organizer}</p>

            <h3 className="mt-8 font-display text-xl font-bold">Location</h3>
            <div className="mt-3 grid aspect-video place-items-center rounded-2xl border border-dashed border-line bg-surface p-6 text-center">
              <div>
                <MapPin className="mx-auto mb-2 text-muted" size={24} aria-hidden="true" />
                <p className="text-sm font-medium">{event.venue}</p>
                <p className="mt-1 text-xs text-muted">Map placeholder. Embed Google Maps or Mapbox here.</p>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-line bg-surface p-6 md:sticky md:top-6">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-display text-3xl font-bold">{formatPrice(event.price)}</p>
              <span className="text-sm text-muted">{status}</span>
            </div>
            <p className="mt-1 text-sm text-muted">
              {event.seatsLeft} of {event.capacity} seats left
            </p>

            <div className="my-6">
              <p className="mb-3 text-sm font-medium">Starts in</p>
              <Countdown target={event.date} />
            </div>

            <button type="button" disabled={soldOut} onClick={() => onRegister(event.id)} className="btn-primary w-full">
              <Ticket size={16} aria-hidden="true" />
              {soldOut ? 'Sold out' : 'Register for this event'}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
