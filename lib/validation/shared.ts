/** Central field limits — every form references these, nothing hardcodes its own. */
export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  mobile: { minDigits: 7, maxDigits: 15 },
  message: { min: 10, max: 2000 },
  roomNumber: { min: 1, max: 20 },
  specialRequest: { max: 1000 },
  guests: { adultsMin: 1, childrenMin: 0, max: 20 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Optional leading +, then digits/spaces/hyphens, first and last char a digit.
const PHONE_PATTERN = /^\+?[0-9][0-9\s-]{4,18}[0-9]$/;

export function validateRequiredLength(
  value: string,
  { min, max, label }: { min: number; max: number; label: string },
): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length === 0) return `${label} is required.`;
  if (trimmed.length < min) return `${label} must be at least ${min} characters.`;
  if (trimmed.length > max) return `${label} must be ${max} characters or fewer.`;
  return undefined;
}

export function validateOptionalLength(
  value: string,
  { max, label }: { max: number; label: string },
): string | undefined {
  if (value.trim().length > max) return `${label} must be ${max} characters or fewer.`;
  return undefined;
}

export function validateName(value: string): string | undefined {
  return validateRequiredLength(value, { ...LIMITS.name, label: "Name" });
}

export function validateRoomNumber(value: string): string | undefined {
  return validateRequiredLength(value, { ...LIMITS.roomNumber, label: "Room number" });
}

export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length === 0) return "Email is required.";
  if (trimmed.length > LIMITS.email.max) {
    return `Email must be ${LIMITS.email.max} characters or fewer.`;
  }
  if (!EMAIL_PATTERN.test(trimmed)) return "Enter a valid email address.";
  return undefined;
}

export function validatePhone(value: string, label = "Mobile number"): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length === 0) return `${label} is required.`;
  const digitCount = trimmed.replace(/\D/g, "").length;
  if (digitCount < LIMITS.mobile.minDigits || digitCount > LIMITS.mobile.maxDigits) {
    return `${label} must have ${LIMITS.mobile.minDigits}–${LIMITS.mobile.maxDigits} digits.`;
  }
  if (!PHONE_PATTERN.test(trimmed)) return `Enter a valid ${label.toLowerCase()}.`;
  return undefined;
}

/** Accepts either a phone number or an email — used by the general contact form. */
export function validatePhoneOrEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length === 0) return "Enter a phone number or email.";
  if (trimmed.length > LIMITS.email.max) {
    return `That's too long — ${LIMITS.email.max} characters max.`;
  }
  return trimmed.includes("@") ? validateEmail(trimmed) : validatePhone(trimmed, "Phone number");
}

export function validateGuestCount(
  value: number,
  { min, max, label }: { min: number; max: number; label: string },
): string | undefined {
  if (!Number.isFinite(value) || !Number.isInteger(value)) {
    return `${label} must be a whole number.`;
  }
  if (value < min) return `${label} must be at least ${min}.`;
  if (value > max) return `${label} must be ${max} or fewer.`;
  return undefined;
}

/** Rejects empty and past dates. Expects the browser's native "YYYY-MM-DD" date value. */
export function validateFutureDate(value: string, label = "Date"): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length === 0) return `${label} is required.`;
  const todayIso = new Date().toISOString().slice(0, 10);
  if (trimmed < todayIso) return `${label} must be today or later.`;
  return undefined;
}

/** True only when every value in the errors object is undefined. */
export function isValid<T extends object>(errors: T): boolean {
  return Object.values(errors).every((error) => !error);
}
