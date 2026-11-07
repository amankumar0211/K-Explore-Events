const KEY = 'kexplore-registrations';

export function getRegistrations() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Saves one registration. Rejects a second registration with the same email for the same event.
 * Returns { ok: true, record } on success, or { ok: false, reason } on failure.
 */
export function saveRegistration(entry) {
  const all = getRegistrations();
  const email = entry.email.toLowerCase();
  const duplicate = all.some((r) => r.eventId === entry.eventId && r.email.toLowerCase() === email);
  if (duplicate) return { ok: false, reason: 'duplicate' };

  const record = {
    ...entry,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(KEY, JSON.stringify([...all, record]));
    return { ok: true, record };
  } catch {
    return { ok: false, reason: 'storage' };
  }
}
