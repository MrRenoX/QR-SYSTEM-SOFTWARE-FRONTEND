import type { BookingDraft } from "@/lib/types";
import { validateGuestFields } from "./guest";
import {
  isValid,
  LIMITS,
  validateEmail,
  validateFutureDate,
  validateGuestCount,
  validateOptionalLength,
} from "./shared";

export interface BookingDraftErrors {
  guestName?: string;
  roomNumber?: string;
  whatsapp?: string;
  email?: string;
  date?: string;
  adults?: string;
  children?: string;
  specialRequest?: string;
}

export function validateBookingDraft(draft: BookingDraft): {
  valid: boolean;
  errors: BookingDraftErrors;
} {
  const guestErrors = validateGuestFields({
    name: draft.guestName,
    roomNumber: draft.roomNumber,
    mobile: draft.whatsapp,
  });

  const errors: BookingDraftErrors = {
    guestName: guestErrors.name,
    roomNumber: guestErrors.roomNumber,
    whatsapp: guestErrors.mobile,
    email: draft.email.trim() ? validateEmail(draft.email) : undefined,
    date: validateFutureDate(draft.date),
    adults: validateGuestCount(draft.adults, {
      min: LIMITS.guests.adultsMin,
      max: LIMITS.guests.max,
      label: "Adults",
    }),
    children: validateGuestCount(draft.children, {
      min: LIMITS.guests.childrenMin,
      max: LIMITS.guests.max,
      label: "Children",
    }),
    specialRequest: draft.specialRequest
      ? validateOptionalLength(draft.specialRequest, {
          max: LIMITS.specialRequest.max,
          label: "Special request",
        })
      : undefined,
  };
  return { valid: isValid(errors), errors };
}
