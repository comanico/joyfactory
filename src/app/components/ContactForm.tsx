"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  submitContactInquiry,
  type ContactFormError,
} from "@/app/contact/actions";
import type { SupportedLang } from "@/i18n/resources";

const INQUIRY_OPTIONS = [
  { value: "general", key: "contactPage.inquiry.general" },
  { value: "party", key: "contactPage.inquiry.party" },
  { value: "group", key: "contactPage.inquiry.group" },
  { value: "safety", key: "contactPage.inquiry.safety" },
  { value: "feedback", key: "contactPage.inquiry.feedback" },
] as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState<string>("general");
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState<ContactFormError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const lang = (i18n.language === "en" ? "en" : "ro") as SupportedLang;

  const inquiryLabel = useMemo(() => {
    const opt = INQUIRY_OPTIONS.find((o) => o.value === inquiryType);
    return opt ? t(opt.key) : t("contactPage.inquiry.general");
  }, [inquiryType, t]);

  const errorMessage = (code: ContactFormError) => {
    const map: Record<ContactFormError, string> = {
      email_required: t("contactPage.errors.emailRequired"),
      phone_required: t("contactPage.errors.phoneRequired"),
      invalid_email: t("contactPage.errors.invalidEmail"),
      invalid_phone: t("contactPage.errors.invalidPhone"),
      send_failed: t("contactPage.errors.sendFailed"),
    };
    return map[code];
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldError(null);
    setSuccess(false);

    if (!email.trim()) {
      setFieldError("email_required");
      return;
    }
    if (!phone.trim()) {
      setFieldError("phone_required");
      return;
    }
    if (!isValidEmail(email)) {
      setFieldError("invalid_email");
      return;
    }
    if (!isValidPhone(phone)) {
      setFieldError("invalid_phone");
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitContactInquiry({
        firstName,
        lastName,
        email,
        phone,
        inquiryType,
        message,
        inquiryLabel,
        lang,
      });

      if (!result.ok) {
        setFieldError(result.error);
        return;
      }

      setSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setInquiryType("general");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-8 relative z-10" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label
            htmlFor="contact-first-name"
            className="block text-sm font-headline font-bold text-on-surface-variant px-1"
          >
            {t("booking.firstName")}
          </label>
          <input
            id="contact-first-name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface transition-all"
            placeholder="Alex"
            type="text"
            autoComplete="given-name"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="contact-last-name"
            className="block text-sm font-headline font-bold text-on-surface-variant px-1"
          >
            {t("booking.lastName")}
          </label>
          <input
            id="contact-last-name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface transition-all"
            placeholder="Joyner"
            type="text"
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="block text-sm font-headline font-bold text-on-surface-variant px-1"
          >
            {t("booking.email")} *
          </label>
          <input
            id="contact-email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldError(null);
              setSuccess(false);
            }}
            className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface transition-all"
            placeholder="alex@example.com"
            type="email"
            required
            autoComplete="email"
            aria-invalid={email.length > 0 && !isValidEmail(email)}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="contact-phone"
            className="block text-sm font-headline font-bold text-on-surface-variant px-1"
          >
            {t("booking.phone")} *
          </label>
          <input
            id="contact-phone"
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setFieldError(null);
              setSuccess(false);
            }}
            className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface transition-all placeholder:text-on-surface-variant/60"
            placeholder={t("contactPage.phonePlaceholder")}
            type="text"
            inputMode="tel"
            required
            autoComplete="tel"
            aria-invalid={phone.length > 0 && !isValidPhone(phone)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-inquiry"
          className="block text-sm font-headline font-bold text-on-surface-variant px-1"
        >
          {t("contactPage.inquiryType")}
        </label>
        <select
          id="contact-inquiry"
          name="inquiryType"
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value)}
          className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface appearance-none"
        >
          {INQUIRY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.key)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-message"
          className="block text-sm font-headline font-bold text-on-surface-variant px-1"
        >
          {t("contactPage.message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-surface-container-highest border-0 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface transition-all"
          placeholder={t("contactPage.messagePlaceholder")}
          rows={4}
        />
      </div>

      {fieldError && (
        <p className="text-sm font-medium text-red-700 px-1" role="alert">
          {errorMessage(fieldError)}
        </p>
      )}

      {success && (
        <p className="text-sm font-medium text-primary px-1" role="status">
          {t("contactPage.sendSuccess")}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary text-on-primary font-headline font-bold py-5 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {submitting ? t("contactPage.sending") : t("contactPage.send")}
      </button>
    </form>
  );
}
