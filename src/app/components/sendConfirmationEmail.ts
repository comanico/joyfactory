// app/components/sendConfirmationEmail.ts
'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail({
  email,
  bookingId,
  packageType,
  date,
  time,
  duration,
  guests,
}: {
  email: string;
  bookingId: string;
  packageType: string;
  date: string;
  time?: string;
  duration: string;
  guests: number;
}) {
  try {
    const result = await resend.emails.send({
      from: 'JoyFactory Bookings <bookings@joyfactory.com>', // ← Change to your verified domain later
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
            ${time ? `<p><strong>Start Time:</strong> ${time}</p>` : ''}
            <p><strong>Duration:</strong> ${duration}</p>
            <p><strong>Number of Guests:</strong> ${guests}</p>
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
  } catch (error: any) {
    console.error('❌ Failed to send confirmation email:', error);
    // This will now appear in your terminal so we can debug it
    throw new Error(`Email sending failed: ${error.message}`);
  }
}