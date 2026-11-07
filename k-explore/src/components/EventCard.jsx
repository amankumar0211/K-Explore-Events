import { Calendar, MapPin } from 'lucide-react';
import { formatDate, formatPrice, getStatus } from '../data/events.js';

const statusDot = {
  Open: 'bg-accent',
  'Selling fast': 'bg-highlight',
  'Sold out': 'bg-danger',
};

export default function EventCard({ event, onDetails, onRegister }) {
  const status = getStatus(event);
  const soldOut = status === 'Sold out';

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={event.banner}
          alt={`${event.title} banner`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink shadow">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-sm text-muted">
          <Calendar size={15} aria-hidden="true" />
          {formatDate(event.date)}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold leading-tight">{event.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted">
          <MapPin size={15} aria-hidden="true" />
          {event.venue}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{event.shortDescription}</p>

        {/* Ticket perforation: notches sit on the card edges and match the page background. */}
        <div className="relative -mx-6 my-5 border-t border-dashed border-line" aria-hidden="true">
          <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-paper" />
          <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-paper" />
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold">{formatPrice(event.price)}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
              <span className={`h-2 w-2 rounded-full ${statusDot[status]}`} aria-hidden="true" />
              {status}
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => onDetails(event)} className="btn-ghost px-4 py-2">
              Details
            </button>
            <button
              type="button"
              onClick={() => onRegister(event.id)}
              disabled={soldOut}
              className="btn-primary px-4 py-2"
            >
              {soldOut ? 'Sold out' : 'Register'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
