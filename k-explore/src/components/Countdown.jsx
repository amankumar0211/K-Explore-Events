import { useEffect, useState } from 'react';

export default function Countdown({ target }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, new Date(target).getTime() - now);

  if (diff === 0) {
    return <p className="font-display text-xl font-bold">Happening now</p>;
  }

  const units = [
    ['Days', Math.floor(diff / 86_400_000)],
    ['Hours', Math.floor(diff / 3_600_000) % 24],
    ['Minutes', Math.floor(diff / 60_000) % 60],
    ['Seconds', Math.floor(diff / 1_000) % 60],
  ];

  return (
    <dl className="grid grid-cols-4 gap-2">
      {units.map(([label, value]) => (
        <div key={label} className="rounded-xl border border-line bg-paper px-2 py-3 text-center">
          <dt className="text-xs text-muted">{label}</dt>
          <dd className="font-display text-2xl font-bold tabular-nums">{String(value).padStart(2, '0')}</dd>
        </div>
      ))}
    </dl>
  );
}
