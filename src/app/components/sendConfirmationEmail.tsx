"use server";

import { ConfirmationEmail } from "../../emails/confirmation";
import { packageLabel } from "../../lib/packageLabels";
import { defaultFrom, getResend } from "@/lib/resend";

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
  lang,
}: {
  email: string;
  reservationUrl: string;
  bookingId: string;
  packageType: string;
  date: string;
  startTime?: string;
  endTime?: string;
  guests: number;
  lang: "ro" | "en";
}) {
  const timeLine =
    startTime && endTime
      ? `${startTime} – ${endTime}`
      : startTime ?? "—";

  const resend = getResend();
  const result = await resend.emails.send({
    from: defaultFrom(),
    to: [email],
    subject:
      lang === "ro"
        ? `Rezervarea ta FunFactory (${packageLabel({ packageType, lang })}) este confirmată`
        : `Your FunFactory ${packageLabel({ packageType, lang })} reservation is confirmed`,
    react: (
      <ConfirmationEmail
        reservationUrl={reservationUrl}
        packageLabel={packageLabel({ packageType, lang })}
        dateFormatted={date}
        timeLine={timeLine}
        guests={guests}
        greetingName={greetingFromEmail(email)}
        bookingReference={bookingId}
        lang={lang}
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
