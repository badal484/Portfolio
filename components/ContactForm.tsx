"use client";

import { FormEvent, useMemo, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState("");

  const isSubmitting = status === "submitting";

  const statusMessage = useMemo(() => {
    if (status === "success") {
      return notice || "Message sent. I will reply soon.";
    }

    if (status === "error") {
      return notice || "Something went wrong. Please try again or email me directly.";
    }

    return "";
  }, [notice, status]);

  function validate(formData: FormData) {
    const nextErrors: FieldErrors = {};
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (name.length < 2) nextErrors.name = "Enter at least 2 characters.";
    if (!emailPattern.test(email)) nextErrors.email = "Enter a valid email.";
    if (message.length < 10) nextErrors.message = "Write at least 10 characters.";

    return { nextErrors, values: { name, email, message } };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const { nextErrors, values } = validate(formData);

    setErrors(nextErrors);
    setNotice("");

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setNotice("Please fix the highlighted fields.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const result = (await response.json()) as { message?: string; errors?: FieldErrors };

      if (!response.ok) {
        setErrors(result.errors || {});
        setStatus("error");
        setNotice(result.message || "The API rejected the message.");
        return;
      }

      form.reset();
      setStatus("success");
      setNotice(result.message || "Message sent. I will reply soon.");
    } catch {
      setStatus("error");
      setNotice("Network error. Please try again or email me directly.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Contact form: edit labels and API copy here if needed. */}
      <label>
        <span>Name</span>
        <input
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={Boolean(errors.name)}
          autoComplete="name"
          name="name"
          placeholder="Your name"
          required
          type="text"
        />
        {errors.name ? <small id="name-error">{errors.name}</small> : null}
      </label>
      <label>
        <span>Email</span>
        <input
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
        {errors.email ? <small id="email-error">{errors.email}</small> : null}
      </label>
      <label>
        <span>Message</span>
        <textarea
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          name="message"
          placeholder="Tell me about the role or project."
          required
          rows={5}
        />
        {errors.message ? <small id="message-error">{errors.message}</small> : null}
      </label>
      <button className="button button-primary" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
      <p className={`form-status ${status}`} aria-live="polite">
        {statusMessage}
      </p>
    </form>
  );
}
