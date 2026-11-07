import { Search } from 'lucide-react';
import { CATEGORIES } from '../data/events.js';

export default function EventFilters({ query, onQueryChange, category, onCategoryChange, resultCount }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative max-w-md">
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by title or description"
          aria-label="Search events"
          className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent/15"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => onCategoryChange(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? 'bg-ink text-paper' : 'border border-line text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'event' : 'events'}
        </p>
      </div>
    </div>
  );
}
