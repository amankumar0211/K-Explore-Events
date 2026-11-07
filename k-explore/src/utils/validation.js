export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[\p{L}][\p{L} .'-]*$/u;

export function validateName(value) {
  const v = value.trim();
  if (!v) return 'Enter your full name.';
  if (v.length < 2) return 'Name needs at least 2 characters.';
  if (v.length > 60) return 'Name must be 60 characters or fewer.';
  if (!NAME_RE.test(v)) return 'Use letters, spaces, apostrophes, periods or hyphens only.';
  return '';
}

export function validateEmail(value) {
  const v = value.trim();
  if (!v) return 'Enter your email address.';
  if (!EMAIL_RE.test(v)) return 'That email does not look right. Example: name@domain.com';
  return '';
}

export function validatePhone(value) {
  const v = value.trim();
  if (!v) return 'Enter your phone number.';
  if (!/^\+?[\d\s()-]+$/.test(v)) {
    return 'Phone numbers can only include digits, spaces, parentheses, hyphens and a leading +.';
  }
  const digits = v.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return 'Phone number needs 10 to 15 digits.';
  return '';
}

export function validateEvent(value) {
  return value ? '' : 'Choose an event to register for.';
}

const validators = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  eventId: validateEvent,
};

export function validateField(field, value) {
  return validators[field](value ?? '');
}

/** Returns { fieldName: message } for every invalid field. An empty object means valid. */
export function validateForm(values) {
  const errors = {};
  for (const field of Object.keys(validators)) {
    const message = validateField(field, values[field]);
    if (message) errors[field] = message;
  }
  return errors;
}
