import { validateEmail, validateName, validatePhone, validateRoomNumber } from "./shared";

/** Shared guest-identity fields, reused by both the query and booking forms. */
export interface GuestFields {
  name: string;
  roomNumber: string;
  mobile: string;
  email?: string;
}

export interface GuestFieldErrors {
  name?: string;
  roomNumber?: string;
  mobile?: string;
  email?: string;
}

export function validateGuestFields(fields: GuestFields): GuestFieldErrors {
  return {
    name: validateName(fields.name),
    roomNumber: validateRoomNumber(fields.roomNumber),
    mobile: validatePhone(fields.mobile),
    email: fields.email !== undefined ? validateEmail(fields.email) : undefined,
  };
}
