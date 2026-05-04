"use server";

import { Resend } from "resend";
import { ConfirmationEmail } from "../../emails/confirmation";
import { packageLabel } from "../../lib/packageLabels";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set on the server environment.");
  }
  return new Resend(key);
}

function defaultFrom() {
  return (
    process.env.RESEND_FROM?.trim() ??
    "FunFactory Bookings <bookings@fun-factory.ro>"
  );
}

function greetingFromEmail(email: string) {
  const local = email.split("@")[0]?.trim();
  if (!local) return "friend";
  const cleaned = local.replace(/[._+-]+/g, " ").trim();
  const first = cleaned.split(/\s+/)[0];
  if (!first) return "friend";
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

export async function sendConfirmationEmail({
  email,
  reservationUrl,
  bookingId,
  packageType,
  date,
  startTime,
  endTime,
  guests,
}: {
  email: string;
  reservationUrl: string;
  bookingId: string;
  packageType: string;
  date: string;
  startTime?: string;
  endTime?: string;
  guests: number;
}) {
  const hasTimes = Boolean(startTime && endTime);
  const timeLine = hasTimes
    ? `${startTime} – ${endTime}`
    : "Whole day (VIP access)";

  const resend = getResend();
  const result = await resend.emails.send({
    from: defaultFrom(),
    to: [email],
    subject: `Your FunFactory ${packageLabel(packageType)} reservation is confirmed`,
    react: (
      <ConfirmationEmail
        reservationUrl={reservationUrl}
        packageLabel={packageLabel(packageType)}
        dateFormatted={date}
        timeLine={timeLine}
        guests={guests}
        greetingName={greetingFromEmail(email)}
        bookingReference={bookingId}
      />
    ),
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Confirmation email sent:", result);
  }
  return { success: true as const };
}

export async function sendTestEmail(params: { to: string }) {
  const resend = getResend();
  return await resend.emails.send({
    from: defaultFrom(),
    to: [params.to],
    subject: "Resend test email",
    html: "<p>If you got this, Resend is working.</p>",
  });
}
