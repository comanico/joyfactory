import { Resend } from "resend";

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set on the server environment.");
  }
  return new Resend(key);
}

export function defaultFrom() {
  return (
    process.env.RESEND_FROM?.trim() ??
    "FunFactory Bookings <bookings@fun-factory.ro>"
  );
}

export function contactInbox() {
  return process.env.CONTACT_INBOX?.trim() ?? "info@fun-factory.ro";
}
