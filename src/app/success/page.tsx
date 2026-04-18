// app/success/page.tsx
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import Link from 'next/link';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-03-25.dahlia',
  });

  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect('/');
  }

  // Verify the payment with Stripe
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== 'paid') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="text-3xl font-headline font-bold text-red-600">Payment not completed</h1>
          <p className="mt-4 text-on-surface-variant">Something went wrong with the payment.</p>
          <Link href="/" className="mt-8 inline-block bg-primary text-on-primary px-8 py-4 rounded-full font-bold">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
        <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
          <span className="material-symbols-outlined text-5xl">check_circle</span>
        </div>

        <h1 className="text-4xl font-headline font-extrabold text-primary mb-4">
          Payment Successful!
        </h1>
        <p className="text-on-surface-variant text-lg mb-8">
          Your 10% deposit has been received. Your booking is now confirmed.
        </p>

        <div className="bg-surface-container-low rounded-2xl p-6 text-left mb-10">
          <p className="text-sm text-on-surface-variant">Booking ID</p>
          <p className="font-mono text-primary font-bold">{session.metadata?.bookingId}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-on-surface-variant">Package</p>
              <p className="font-headline font-bold capitalize">{session.metadata?.packageType}</p>
            </div>
            <div>
              <p className="text-on-surface-variant">Deposit Paid</p>
              <p className="font-headline font-bold text-green-600">
                ${(session.amount_total || 0) / 100}
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="block w-full bg-primary text-on-primary py-5 rounded-3xl font-headline font-bold text-lg hover:scale-105 transition-transform"
        >
          Back to JoyFactory
        </Link>

        <p className="text-xs text-on-surface-variant mt-8">
          A confirmation email has been sent to your inbox.
        </p>
      </div>
    </div>
  );
}