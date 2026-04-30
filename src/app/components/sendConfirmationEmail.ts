// app/components/sendConfirmationEmail.ts
'use server';

import { Resend } from 'resend';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set on the server environment.");
  }
  return new Resend(key);
}

export async function sendConfirmationEmail({
  email,
  bookingId,
  packageType,
  date,
  startTime,
  endTime,
  guests,
}: {
  email: string;
  bookingId: string;
  packageType: string;
  date: string;
  startTime?: string;
  endTime?: string;
  guests: number;
}) {
  try {
    const hasTimes = Boolean(startTime && endTime);
    const resend = getResend();
    const result = await resend.emails.send({
      from: 'JoyFactory Bookings <info@joyfactory.com>', // ← Change to your verified domain later
      to: [email],
      subject: `🎉 Your JoyFactory ${packageType.toUpperCase()} Booking is Confirmed!`,
      html: `
        <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #efffd9; border-radius: 24px;">
          <h1 style="color: #63367c; text-align: center;">Thank you for booking with JoyFactory!</h1>
          <p style="font-size: 18px; text-align: center;">Your reservation details:</p>
          
          <div style="background: white; padding: 24px; border-radius: 16px; margin: 20px 0;">
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Package:</strong> ${packageType.toUpperCase()}</p>
            <p><strong>Date:</strong> ${date}</p>
            ${
              hasTimes
                ? `<p><strong>Time:</strong> ${startTime} – ${endTime}</p>`
                : `<p><strong>Time:</strong> Whole day</p>`
            }
            <p><strong>Guests included:</strong> ${guests}</p>
          </div>

          <p style="text-align: center; color: #63367c; font-weight: bold;">
            We can’t wait to welcome you and your little adventurers!
          </p>
          <p style="text-align: center; font-size: 14px; color: #666;">
            JoyFactory Team • Sophisticated Joy for Little Adventurers
          </p>
        </div>
      `,
    });

    console.log('✅ Confirmation email sent successfully:', result);
    return { success: true };
  } catch (error: unknown) {
    console.error('❌ Failed to send confirmation email:', error);
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Email sending failed: ${message}`);
  }
}

export async function sendTestEmail(params: { to: string }) {
  const resend = getResend();
  const result = await resend.emails.send({
    from: 'JoyFactory Bookings <bookings@joyfactory.com>',
    to: [params.to],
    subject: 'Resend test email',
    html: '<p>If you got this, Resend is working.</p>',
  });
  return result;
}