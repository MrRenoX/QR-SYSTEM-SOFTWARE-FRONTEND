import type { ContactDraft } from "@/lib/types";
import { isValid, LIMITS, validateName, validatePhoneOrEmail, validateRequiredLength } from "./shared";

export interface ContactDraftErrors {
  name?: string;
  contact?: string;
  message?: string;
}

export function validateContactDraft(draft: ContactDraft): {
  valid: boolean;
  errors: ContactDraftErrors;
} {
  const errors: ContactDraftErrors = {
    name: validateName(draft.name),
    contact: validatePhoneOrEmail(draft.contact),
    message: validateRequiredLength(draft.message, { ...LIMITS.message, label: "Message" }),
  };
  return { valid: isValid(errors), errors };
}
