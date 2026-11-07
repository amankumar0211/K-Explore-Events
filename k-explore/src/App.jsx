import { useCallback, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import EventFilters from './components/EventFilters.jsx';
import EventCard from './components/EventCard.jsx';
import EventModal from './components/EventModal.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import { sortedEvents } from './data/events.js';

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [detailEvent, setDetailEvent] = useState(null);
  const [preselect, setPreselect] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortedEvents.filter((ev) => {
      const matchesCategory = category === 'All' || ev.category === category;
      const matchesQuery =
        !q ||
        ev.title.toLowerCase().includes(q) ||
        ev.shortDescription.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const closeDetails = useCallback(() => setDetailEvent(null), []);

  const openRegister = useCallback((eventId) => {
    setDetailEvent(null);
    // A new object each time, so pressing Register again re-fills the form even for the same event.
    setPreselect({ eventId, key: Date.now() });
    setTimeout(() => {
      document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }, []);

  const clearFilters = () => {
    setQuery('');
    setCategory('All');
  };

  return (
    <>
      <Navbar />

      <main>
        <Hero nextEvent={sortedEvents[0]} onDetails={setDetailEvent} />

        <section id="events" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6">
          <div className="mb-8">
            <h2 className="font-display text-4xl font-bold sm:text-5xl">Upcoming events</h2>
            <p className="mt-3 text-muted">Filter by what you are in the mood for, or search by name.</p>
          </div>

          <EventFilters
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
            resultCount={filtered.length}
          />

          {filtered.length > 0 ? (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((ev) => (
                <EventCard key={ev.id} event={ev} onDetails={setDetailEvent} onRegister={openRegister} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-dashed border-line p-10 text-center">
              <p className="font-display text-2xl font-bold">Nothing matches that yet.</p>
              <p className="mt-2 text-muted">Try a shorter search, or switch back to All.</p>
              <button type="button" onClick={clearFilters} className="btn-ghost mt-6">
                Clear filters
              </button>
            </div>
          )}
        </section>

        <RegistrationForm preselect={preselect} />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
          <p>K Explore: events worth the trip.</p>
          <p>Registrations are stored in this browser only.</p>
        </div>
      </footer>

      <EventModal event={detailEvent} onClose={closeDetails} onRegister={openRegister} />
    </>
  );
}
