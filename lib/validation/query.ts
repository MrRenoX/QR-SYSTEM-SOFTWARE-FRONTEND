import type { QueryDraft } from "@/lib/types";
import { validateGuestFields, type GuestFieldErrors } from "./guest";
import { isValid, LIMITS, validateRequiredLength } from "./shared";

export interface QueryDraftErrors extends GuestFieldErrors {
  question?: string;
}

export function validateQueryDraft(draft: QueryDraft): {
  valid: boolean;
  errors: QueryDraftErrors;
} {
  const guestErrors = validateGuestFields({
    name: draft.name,
    roomNumber: draft.roomNumber,
    mobile: draft.mobile,
  });

  const errors: QueryDraftErrors = {
    ...guestErrors,
    question: validateRequiredLength(draft.question, { ...LIMITS.message, label: "Question" }),
  };
  return { valid: isValid(errors), errors };
}
