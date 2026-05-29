"use server";

import { contactInbox, defaultFrom, getResend } from "@/lib/resend";

const INQUIRY_TYPES = [
  "general",
  "party",
  "group",
  "safety",
  "feedback",
] as const;

export type ContactInquiryType = (typeof INQUIRY_TYPES)[number];

function isInquiryType(value: string): value is ContactInquiryType {
  return (INQUIRY_TYPES as readonly string[]).includes(value);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type ContactFormError =
  | "email_required"
  | "phone_required"
  | "invalid_email"
  | "invalid_phone"
  | "send_failed";

export type ContactFormResult =
  | { ok: true }
  | { ok: false; error: ContactFormError };

export async function submitContactInquiry(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  inquiryLabel: string;
  lang: "ro" | "en";
}): Promise<ContactFormResult> {
  const email = data.email.trim();
  const phone = data.phone.trim();

  if (!email) return { ok: false, error: "email_required" };
  if (!phone) return { ok: false, error: "phone_required" };
  if (!isValidEmail(email)) return { ok: false, error: "invalid_email" };
  if (!isValidPhone(phone)) return { ok: false, error: "invalid_phone" };

  const inquiryType = isInquiryType(data.inquiryType) ? data.inquiryType : "general";
  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  const message = data.message.trim();
  const nameLine = [firstName, lastName].filter(Boolean).join(" ") || "—";

  const subject =
    data.lang === "ro"
      ? `Solicitare contact FunFactory — ${data.inquiryLabel}`
      : `FunFactory contact inquiry — ${data.inquiryLabel}`;

  const html = `
    <h2>${escapeHtml(subject)}</h2>
    <p><strong>${data.lang === "ro" ? "Nume" : "Name"}:</strong> ${escapeHtml(nameLine)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <p><strong>${data.lang === "ro" ? "Telefon" : "Phone"}:</strong> ${escapeHtml(phone)}</p>
    <p><strong>${data.lang === "ro" ? "Tip solicitare" : "Inquiry type"}:</strong> ${escapeHtml(data.inquiryLabel)} (${escapeHtml(inquiryType)})</p>
    <p><strong>${data.lang === "ro" ? "Mesaj" : "Message"}:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message || "—")}</p>
  `;

  try {
    const resend = getResend();
    await resend.emails.send({
      from: defaultFrom(),
      to: [contactInbox()],
      replyTo: email,
      subject,
      html,
    });
    return { ok: true };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Contact inquiry email failed:", err);
    }
    return { ok: false, error: "send_failed" };
  }
}
