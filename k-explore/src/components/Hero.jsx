import Countdown from './Countdown.jsx';
import { formatDate } from '../data/events.js';

export default function Hero({ nextEvent, onDetails }) {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-6 md:grid-cols-[1.2fr_1fr] md:items-center md:pt-24"
    >
      <div>
        <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          Find the room worth leaving the house for.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Concerts, hackathons, matches and workshops in one place. Pick what sounds good and reserve
          your spot in under a minute.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#events" className="btn-primary">
            Browse events
          </a>
          <a href="#register" className="btn-ghost">
            Reserve a spot
          </a>
        </div>
      </div>

      {nextEvent && (
        <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm sm:p-6">
          <img src={nextEvent.banner} alt="" className="aspect-[16/9] w-full rounded-2xl object-cover" />
          <p className="mt-5 text-sm text-muted">Next up</p>
          <h2 className="mt-1 font-display text-2xl font-bold leading-tight">{nextEvent.title}</h2>
          <p className="mt-1 text-sm text-muted">
            {formatDate(nextEvent.date)} at {nextEvent.venue}
          </p>
          <div className="mt-5">
            <Countdown target={nextEvent.date} />
          </div>
          <button type="button" onClick={() => onDetails(nextEvent)} className="btn-ghost mt-5 w-full">
            See details
          </button>
        </div>
      )}
    </section>
  );
}
