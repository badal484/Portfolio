export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: Partial<Record<keyof ContactPayload, string>> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(input: unknown): ValidationResult {
  const errors: Partial<Record<keyof ContactPayload, string>> = {};
  const payload = input as Partial<ContactPayload>;

  const name = typeof payload?.name === "string" ? payload.name.trim() : "";
  const email = typeof payload?.email === "string" ? payload.email.trim() : "";
  const message = typeof payload?.message === "string" ? payload.message.trim() : "";

  if (name.length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }

  if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (message.length < 10) {
    errors.message = "Please write at least 10 characters.";
  }

  if (message.length > 2000) {
    errors.message = "Please keep the message under 2000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data: { name, email, message } };
}
